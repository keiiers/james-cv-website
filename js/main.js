// 平滑滾動功能
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            // 增加偏移量以確保標題完全可見
            const headerOffset = 100; 
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            // 滾動到目標位置
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // 添加活動狀態到當前選中的導航項
            document.querySelectorAll('nav a').forEach(link => {
                link.classList.remove('active');
                link.classList.remove('text-blue-500', 'font-semibold');
                link.classList.add('text-gray-600');
            });
            this.classList.add('active', 'text-blue-500', 'font-semibold');
            this.classList.remove('text-gray-600');

            // 如果是移動端選單，點擊後關閉
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu.classList.contains('block')) {
                toggleMobileMenu(false);
            }
        }
    });
});

// 導航欄滾動效果
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('bg-white', 'shadow-md');
        nav.classList.remove('bg-transparent');
    } else {
        nav.classList.remove('bg-white', 'shadow-md');
        nav.classList.add('bg-transparent');
    }
    
    // 滾動時更新活動導航項
    const scrollPosition = window.scrollY;
    
    // 獲取所有區塊並確定當前可見的區塊
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;
        const sectionId = '#' + section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('nav a').forEach(link => {
                link.classList.remove('active');
                link.classList.remove('text-blue-500', 'font-semibold');
                link.classList.add('text-gray-600');
                
                if (link.getAttribute('href') === sectionId) {
                    link.classList.add('active', 'text-blue-500', 'font-semibold');
                    link.classList.remove('text-gray-600');
                }
            });
        }
    });
});

// 移動端選單切換功能
function toggleMobileMenu(show) {
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (show) {
        mobileMenu.classList.remove('hidden');
        setTimeout(() => {
            mobileMenu.classList.add('block');
        }, 10); // 小延遲以確保過渡效果
    } else {
        mobileMenu.classList.remove('block');
        // 等待過渡效果完成後再隱藏
        setTimeout(() => {
            mobileMenu.classList.add('hidden');
        }, 300);
    }
}

// 移動端選單按鈕事件
const menuButton = document.getElementById('menu-button');
const closeMenu = document.getElementById('close-menu');

menuButton.addEventListener('click', () => {
    toggleMobileMenu(true);
});

closeMenu.addEventListener('click', () => {
    toggleMobileMenu(false);
});

// 點擊選單外部關閉選單
document.addEventListener('click', (e) => {
    const mobileMenu = document.getElementById('mobile-menu');
    if (!menuButton.contains(e.target) && 
        !mobileMenu.contains(e.target) && 
        mobileMenu.classList.contains('block')) {
        toggleMobileMenu(false);
    }
});

// 列印功能
document.getElementById('print-button').addEventListener('click', () => {
    window.print();
});

document.getElementById('mobile-print-button').addEventListener('click', () => {
    window.print();
});

// 技能進度條動畫
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const target = bar.getAttribute('data-progress');
        bar.style.width = target + '%';
    });
}

// 頁面載入完成後執行動畫和設置初始活動導航項
document.addEventListener('DOMContentLoaded', () => {
    animateSkills();
    
    // 設置初始活動導航項
    const initialSection = window.location.hash || '#basic-info';
    const initialLink = document.querySelector(`nav a[href="${initialSection}"]`);
    if (initialLink) {
        initialLink.classList.add('active', 'text-blue-500', 'font-semibold');
        initialLink.classList.remove('text-gray-600');
    }
});

// 推薦人資訊顯示控制
const showReferencesBtn = document.getElementById('show-references');
const referencesContent = document.getElementById('references-content');
let isReferencesVisible = false;

// 密碼驗證功能
function verifyPassword(inputPassword) {
    const correctPassword = "122954750"; // 預設密碼
    return inputPassword === correctPassword;
}

showReferencesBtn.addEventListener('click', () => {
    if (!isReferencesVisible) {
        const password = prompt("請輸入授權密碼：");
        if (password && verifyPassword(password)) {
            isReferencesVisible = true;
            referencesContent.classList.remove('hidden');
            showReferencesBtn.querySelector('span').textContent = '隱藏推薦人資訊';
            referencesContent.classList.add('animate-fade-in');
        } else if (password !== null) { // 用戶輸入了錯誤密碼（而不是按取消）
            alert("密碼錯誤，無法顯示推薦人資訊");
        }
    } else {
        isReferencesVisible = false;
        referencesContent.classList.add('hidden');
        referencesContent.classList.remove('animate-fade-in');
        showReferencesBtn.querySelector('span').textContent = '顯示推薦人資訊';
    }
});

// 點擊其他區域時隱藏推薦人資訊
document.addEventListener('click', (e) => {
    if (isReferencesVisible && 
        !showReferencesBtn.contains(e.target) && 
        !referencesContent.contains(e.target)) {
        isReferencesVisible = false;
        referencesContent.classList.add('hidden');
        referencesContent.classList.remove('animate-fade-in');
        showReferencesBtn.querySelector('span').textContent = '顯示推薦人資訊';
    }
});