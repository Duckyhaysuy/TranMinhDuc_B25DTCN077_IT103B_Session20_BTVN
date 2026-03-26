
let songs = JSON.parse(localStorage.getItem('songs')) || [];
let editingId = null;

function displaySongs(songsToDisplay = songs) {
    const tbody = document.getElementById('songTable');
    tbody.innerHTML = '';
    songsToDisplay.forEach((song, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${song.title}</td>
            <td>${song.artist}</td>
            <td>
                <button onclick="editSong(${song.id})">Sửa</button>
                <button onclick="deleteSong(${song.id})">Xóa</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function handleSubmit() {
    const title = document.getElementById('title').value.trim();
    const artist = document.getElementById('artist').value.trim();
    if (!title || !artist) {
        alert('Vui lòng nhập đầy đủ thông tin');
        return;
    }
    if (editingId !== null) {
        const song = songs.find(s => s.id === editingId);
        song.title = title;
        song.artist = artist;
        editingId = null;
        document.getElementById('formTitle').textContent = '🎵 Thêm bài hát';
        document.getElementById('submitBtn').textContent = 'Thêm';
        document.getElementById('cancelBtn').style.display = 'none';
    } else {
        const newSong = { id: Date.now(), title, artist };
        songs.push(newSong);
    }
    saveSongs();
    displaySongs();
    clearForm();
    document.getElementById('cancelBtn').style.display = 'none';
}

function editSong(id) {
    const song = songs.find(s => s.id === id);
    document.getElementById('title').value = song.title;
    document.getElementById('artist').value = song.artist;
    editingId = id;
    document.getElementById('formTitle').textContent = '🎵 Sửa bài hát';
    document.getElementById('submitBtn').textContent = 'Cập nhật';
    document.getElementById('cancelBtn').style.display = 'inline-block';
}

function cancelEdit() {
    editingId = null;
    document.getElementById('formTitle').textContent = '🎵 Thêm bài hát';
    document.getElementById('submitBtn').textContent = 'Thêm';
    clearForm();
    document.getElementById('cancelBtn').style.display = 'none';
}

function deleteSong(id) {
    songs = songs.filter(s => s.id !== id);
    saveSongs();
    displaySongs();
}

function searchSong() {
    const query = document.getElementById('search').value.toLowerCase();
    const filtered = songs.filter(song => song.title.toLowerCase().includes(query));
    displaySongs(filtered);
}

function saveSongs() {
    localStorage.setItem('songs', JSON.stringify(songs));
}

function clearForm() {
    document.getElementById('title').value = '';
    document.getElementById('artist').value = '';
}

document.addEventListener('DOMContentLoaded', () => {
    displaySongs();
});
