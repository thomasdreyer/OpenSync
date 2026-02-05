using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json.Serialization;

namespace OpenSync.Client;

public sealed class OpenSyncClient
{
    private readonly HttpClient _httpClient;
    private readonly string _baseUrl;
    private string? _token;

    public OpenSyncClient(string baseUrl, HttpClient? httpClient = null)
    {
        _baseUrl = baseUrl.TrimEnd('/');
        _httpClient = httpClient ?? new HttpClient();
    }

    public async Task<AuthResponse> RegisterAsync(string email, string password, CancellationToken cancellationToken = default)
    {
        var response = await _httpClient.PostAsJsonAsync(
            $"{_baseUrl}/auth/register",
            new AuthRequest(email, password),
            cancellationToken
        );

        response.EnsureSuccessStatusCode();
        var payload = await response.Content.ReadFromJsonAsync<AuthResponse>(cancellationToken: cancellationToken)
            ?? throw new InvalidOperationException("Empty auth response");
        _token = payload.Token;
        return payload;
    }

    public async Task<IReadOnlyList<SyncChange>> PullAsync(long since, CancellationToken cancellationToken = default)
    {
        using var request = new HttpRequestMessage(HttpMethod.Get, $"{_baseUrl}/sync/pull?since={since}");
        if (!string.IsNullOrWhiteSpace(_token))
        {
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _token);
        }

        using var response = await _httpClient.SendAsync(request, cancellationToken);
        response.EnsureSuccessStatusCode();

        var payload = await response.Content.ReadFromJsonAsync<List<SyncChange>>(cancellationToken: cancellationToken);
        return payload ?? [];
    }

    public async Task<IReadOnlyList<SyncChange>> PushAsync(IEnumerable<SyncChangeInput> changes, CancellationToken cancellationToken = default)
    {
        using var request = new HttpRequestMessage(HttpMethod.Post, $"{_baseUrl}/sync/push");
        if (!string.IsNullOrWhiteSpace(_token))
        {
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _token);
        }

        request.Content = JsonContent.Create(new PushRequest(changes));

        using var response = await _httpClient.SendAsync(request, cancellationToken);
        response.EnsureSuccessStatusCode();

        var payload = await response.Content.ReadFromJsonAsync<List<SyncChange>>(cancellationToken: cancellationToken);
        return payload ?? [];
    }
}

public sealed record AuthRequest(string Email, string Password);
public sealed record AuthResponse([property: JsonPropertyName("token")] string Token);
public sealed record PushRequest(IEnumerable<SyncChangeInput> Changes);
public sealed record SyncChangeInput(string Collection, Dictionary<string, object?> Data);
public sealed record SyncChange(string Id, string UserId, string Collection, Dictionary<string, object?> Data, long Version);
