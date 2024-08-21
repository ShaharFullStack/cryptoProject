export function fetchData(url, params, onSuccess, onError) {
    $.ajax({
        url,
        method: 'GET',
        data: params,
        success: onSuccess,
        error: onError,
    });
}

export function handleError(xhr) {
    if (xhr.status === 429) {
        $('#main-content').html('<p>Rate limit exceeded. Please try again later.</p>');
    } else {
        $('#main-content').html('<p id="special">Error loading coins. Please try again later.</p>');
    }
}
