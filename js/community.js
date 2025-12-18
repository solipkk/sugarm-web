// Community Board Logic
const STORAGE_KEY = 'sugar_community_posts';

// Sample initial data if empty
const INITIAL_POSTS = [
    { id: 1, category: 'Notice', title: 'SugarMacro 커뮤니티 오픈 안내', author: 'Admin', date: '2025-12-18', views: 125, content: '환영합니다! 자유롭게 의견을 나누세요.' },
    { id: 2, category: 'Tip', title: 'YOLO 학습 데이터 모으는 꿀팁 공유합니다', author: 'Hunter', date: '2025-12-18', views: 45, content: '스크린샷 찍을 때 다양한 환경에서 찍으세요.' },
    { id: 3, category: 'Question', title: '설치 중에 오류가 나는데 도와주세요', author: 'Newbie', date: '2025-12-18', views: 12, content: 'CUDA 설치가 안된다고 나옵니다.' }
];

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('boardList')) {
        loadPosts();
    }
});

function getPosts() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : INITIAL_POSTS;
}

function savePosts(posts) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

function loadPosts() {
    const posts = getPosts();
    const tbody = document.getElementById('boardList');
    tbody.innerHTML = '';

    // Sort by ID desc (newest first)
    posts.sort((a, b) => b.id - a.id).forEach(post => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${post.id}</td>
            <td><span class="badge ${post.category.toLowerCase()}">${post.category}</span></td>
            <td class="title-col" onclick="viewPost(${post.id})">${post.title}</td>
            <td>${post.author}</td>
            <td>${post.date}</td>
            <td>${post.views}</td>
        `;
        tbody.appendChild(row);
    });
}

// Modal Logic
function openWriteModal() {
    document.getElementById('writeModal').style.display = 'block';
}

function closeWriteModal() {
    document.getElementById('writeModal').style.display = 'none';
}

function submitPost(e) {
    e.preventDefault();
    const title = document.getElementById('postTitle').value;
    const author = document.getElementById('postAuthor').value;
    const category = document.getElementById('postCategory').value;
    const content = document.getElementById('postContent').value;

    // Create new post
    const posts = getPosts();
    const newId = posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1;
    const date = new Date().toISOString().split('T')[0];

    const newPost = {
        id: newId,
        category,
        title,
        author,
        date,
        views: 0,
        content
    };

    posts.push(newPost);
    savePosts(posts);

    // Reset and reload
    document.getElementById('writeForm').reset();
    closeWriteModal();
    loadPosts();
}

function viewPost(id) {
    const posts = getPosts();
    const post = posts.find(p => p.id === id);
    if (!post) return;

    // Increment view
    post.views++;
    savePosts(posts);
    loadPosts(); // updates view count in background

    const contentDiv = document.getElementById('viewContent');
    contentDiv.innerHTML = `
        <h2 style="margin-bottom:10px;">${post.title}</h2>
        <div style="color:#aaa; border-bottom:1px solid #333; padding-bottom:15px; margin-bottom:20px; font-size:0.9rem;">
            <span>Category: ${post.category}</span> | 
            <span>Author: ${post.author}</span> | 
            <span>Date: ${post.date}</span> | 
            <span>Views: ${post.views}</span>
        </div>
        <div style="line-height:1.6; min-height:100px; white-space: pre-wrap;">${post.content}</div>
    `;

    document.getElementById('viewModal').style.display = 'block';
}

function closeViewModal() {
    document.getElementById('viewModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function (event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}
