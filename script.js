// DOM 요소들
const uploadBtn = document.getElementById('uploadBtn');
const fileInput = document.getElementById('fileInput');
const selectedFile = document.getElementById('selectedFile');
const categoryBtn = document.getElementById('categoryBtn');
const selectedCategory = document.getElementById('selectedCategory');
const categoryModal = document.getElementById('categoryModal');
const closeModal = document.getElementById('closeModal');
const categoryOptions = document.querySelectorAll('.category-option');
const nicknameInput = document.getElementById('nickname');
const anonymousCheck = document.getElementById('anonymousCheck');
const submitBtn = document.getElementById('submitBtn');

// 전역 변수
let selectedFileData = null;
let selectedCategoryData = null;

// 파일 업로드 기능
uploadBtn.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        // 파일 크기 체크 (10MB)
        if (file.size > 10 * 1024 * 1024) {
            alert('파일 크기는 10MB를 초과할 수 없습니다.');
            fileInput.value = '';
            return;
        }
        
        // 파일 타입 체크
        if (!file.type.startsWith('image/')) {
            alert('이미지 파일만 업로드 가능합니다.');
            fileInput.value = '';
            return;
        }
        
        selectedFileData = file;
        selectedFile.style.display = 'block';
        selectedFile.innerHTML = `
            <strong>선택된 파일:</strong> ${file.name} 
            <span style="color: #666;">(${(file.size / 1024 / 1024).toFixed(2)}MB)</span>
        `;
        
        // 업로드 버튼 스타일 변경
        uploadBtn.style.background = '#e3f2fd';
        uploadBtn.style.borderColor = '#2196f3';
        uploadBtn.style.color = '#1976d2';
    }
});

// 카테고리 선택 모달
categoryBtn.addEventListener('click', () => {
    categoryModal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // 스크롤 방지
});

closeModal.addEventListener('click', () => {
    categoryModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// 모달 외부 클릭시 닫기
window.addEventListener('click', (e) => {
    if (e.target === categoryModal) {
        categoryModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// ESC 키로 모달 닫기
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && categoryModal.style.display === 'block') {
        categoryModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// 카테고리 옵션 선택
categoryOptions.forEach(option => {
    option.addEventListener('click', () => {
        // 이전 선택 해제
        categoryOptions.forEach(opt => opt.classList.remove('selected'));
        
        // 현재 선택
        option.classList.add('selected');
        selectedCategoryData = option.dataset.category;
        
        // 선택된 카테고리 표시
        selectedCategory.style.display = 'inline-block';
        selectedCategory.textContent = selectedCategoryData;
        
        // 카테고리 버튼 스타일 변경
        categoryBtn.style.background = '#e3f2fd';
        categoryBtn.style.borderColor = '#2196f3';
        categoryBtn.style.color = '#1976d2';
        
        // 모달 닫기
        setTimeout(() => {
            categoryModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    });
});

// 익명 제보 체크박스 처리
anonymousCheck.addEventListener('change', () => {
    if (anonymousCheck.checked) {
        nicknameInput.disabled = true;
        nicknameInput.value = '';
        nicknameInput.style.opacity = '0.5';
    } else {
        nicknameInput.disabled = false;
        nicknameInput.style.opacity = '1';
    }
});

// 폼 제출
submitBtn.addEventListener('click', () => {
    // 유효성 검사
    if (!selectedFileData) {
        alert('경고문 이미지를 업로드해주세요.');
        return;
    }
    
    if (!selectedCategoryData) {
        alert('카테고리를 선택해주세요.');
        return;
    }
    
    if (!anonymousCheck.checked && !nicknameInput.value.trim()) {
        alert('닉네임을 입력하거나 익명 제보를 선택해주세요.');
        return;
    }
    
    // 제출 데이터 준비
    const submitData = {
        file: selectedFileData,
        category: selectedCategoryData,
        nickname: anonymousCheck.checked ? '익명' : nicknameInput.value.trim(),
        timestamp: new Date().toISOString()
    };
    
    // 실제 제출 로직 (여기서는 콘솔에 출력)
    console.log('제출된 데이터:', submitData);
    
    // 성공 메시지
    alert('경고문이 성공적으로 제보되었습니다!');
    
    // 폼 초기화
    resetForm();
});

// 폼 초기화 함수
function resetForm() {
    // 파일 초기화
    fileInput.value = '';
    selectedFile.style.display = 'none';
    selectedFileData = null;
    uploadBtn.style.background = '#f8f9fa';
    uploadBtn.style.borderColor = '#dee2e6';
    uploadBtn.style.color = '#495057';
    
    // 카테고리 초기화
    selectedCategory.style.display = 'none';
    selectedCategoryData = null;
    categoryBtn.style.background = '#f8f9fa';
    categoryBtn.style.borderColor = '#dee2e6';
    categoryBtn.style.color = '#495057';
    
    // 닉네임 초기화
    nicknameInput.value = '';
    anonymousCheck.checked = false;
    nicknameInput.disabled = false;
    nicknameInput.style.opacity = '1';
    
    // 카테고리 옵션 선택 해제
    categoryOptions.forEach(opt => opt.classList.remove('selected'));
}

// 파일 드래그 앤 드롭 기능
const uploadSection = document.querySelector('.upload-section');

uploadSection.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadSection.style.border = '2px dashed #2563eb';
    uploadSection.style.background = '#f0f8ff';
});

uploadSection.addEventListener('dragleave', (e) => {
    e.preventDefault();
    uploadSection.style.border = 'none';
    uploadSection.style.background = 'transparent';
});

uploadSection.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadSection.style.border = 'none';
    uploadSection.style.background = 'transparent';
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        fileInput.files = files;
        fileInput.dispatchEvent(new Event('change'));
    }
});

// 페이지 로드 완료 후 초기화
document.addEventListener('DOMContentLoaded', () => {
    console.log('경고문 제보 웹사이트가 로드되었습니다.');
    
    // 폼 초기 상태 설정
    resetForm();
});
