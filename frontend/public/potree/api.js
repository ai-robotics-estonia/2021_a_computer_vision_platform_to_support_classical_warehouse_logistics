export const server_path = '/api/v1';

export function getPointCloudId() {
    const urlParams = new URLSearchParams(window.location.search);
    const pointCloudParam = urlParams.get('point_cloud');
    return !pointCloudParam ? null : Number(pointCloudParam)
}

export async function getPointCloudData(id) {
    const res = await fetch(`${server_path}/pc/${id}`, { credentials: 'include' });
    return res.json();
}

export async function postPointCloudOffset(id, value) {
    return fetch(`${server_path}/pc/${id}/offset`, { credentials: 'include', method: 'post', headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(value) });
}

export async function getPointCloudInit(id) {
    return fetch(`${server_path}/pc/${id}/init`, { credentials: 'include'});
}

export async function getPointCloudCameraPositions(folderId) {
    const res = await fetch(`${server_path}/s_generated/${folderId}/camera_positions.csv`, { credentials: 'include'})
    return res.text();
}

export async function getRoomData(id) {
    const res = await fetch(`${server_path}/rooms/${id}`, { credentials: 'include' });
    return res.json();
}

