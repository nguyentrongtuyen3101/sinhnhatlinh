const friends = [
    { name: "Thanh Phương", img: "image/phuong.jpg", date: "2004-09-24" },
    { name: "Đạt Đần", img: "image/dat.jpg", date: "2004-08-04" },
    { name: "Thu Thủy", img: "image/thuy.jpg", date: "2004-05-25" },
    { name: "Thảo Chi", img: "image/chi.jpg", date: "2004-02-10" },
    { name: "Trọng Tuyền", img: "image/tuyen.jpg", date: "2004-01-31" }
];

const letterText = `Gửi Thủy Linh – Ê đừng bấm cái nút [Xem Hết Luôn] để cho chữ nó chạy cho ló nghệ ,

Hôm nay là sinh nhật m thì đêm qua t render thư bằng chat gpt nhưng mà thấy Phương bảo năm sau m về quê lấy chồng r nên tao mới thu hồi tin nhắn để viết thư tay nhưng mà tao cũng không biết viết gì,
tao hay bảo m đần nhưng mà thật ra không phải m đần đâu chỉ là kiểu m load chậm, với m bị ngơ ngác xong m cứ oe oe nên t mới bảo m là lân đình, nhưng m là người đầu tiên tao viết thư tay cho, mịa ny tao t còn chưa viết,
mấy lần tao mắng m xong tao cảm thấy rất hân hận với hành động của mình nên tao đều đi chùa để xám hối ,tao không biết viết gì nữa nhưng mà thật sự nhìn mặt m rất hài ,kiểu mặt m nó rất ngơ ngác xong cứ đơ đễnh nên nhìn m buồn cười v,
m đọc trên web với làm trên web chứ không dc bật f12 đọc ở file script đâu đấy, lần đâu tao gặp m t nghĩ m là gơn phố kiểu chảnh chọe ăn chơi, chát tán , không sợ ai , trên đâm sơn lâm dưới đâm hà bá, nhưng mãi về sua mới biết m ngơ ngác v,
tao có hứa là sẽ kiếm ny cho m nhưng mà tao chưa thấy ai phù hợp với m cả, có mỗi đối tượng tao kể vs m thì bị đuổi r nhưng không sao tao mới quen được một anh ở Nghệ An , ảnh đẹp trai với hài ẻ lắm giọng anh còn hay nữa nhưng mà anh hay bị đuổi 
ra ngoài ngủ một mình vì mọi người sợ ảnh quấy rối mọi người :))))), có nhiều cái mà tao muốn hỏi m sao lại như vậy nhưng mà thôi tao không nói nữa hahahahahahhahaa, tao thấy m sống tình cảm vì vừa nói cái m đã khóc r, nhưng mà năm sau m về quê thật à,
à có một cái là bạn của tao lần tháng 6 xem ảnh đi Ninh Bình khen như này [ố bạn váy vàng đội nón xinh thế ,nhìn như tây ý nhìn sang v ò], những lần tao bảo ngón tay m múp thì m ko biết nhưng mà ngón tay múp là rất đẹp nhé ,người ta rất thích có ngón tay như vậy,
thôi không biết viết gì nữa đâu nhưng mà chúc đi làm vui vẻ, được việc sự nghiệp thắng tiến và dù có sống hay làm việc ở bất kỳ đâu có gần bạn bè hay không thì vẫn phải hạnh phúc, phấn đấu kiên trì với mục tiêu đặt ra dù mục tiêu đó có phải là ước mơ của mình hay không,
mệt mỏi thì nghỉ một tý chứ ko bỏ cuộc, cái gì không làm được thì vừa khóc vừa làm. CHỨC MỪNG SINH NHẬT`;

let currentStep = 0;
let typingInterval;

// Hàm tung pháo hoa và hiệu ứng chúc mừng
function celebrate() {
    const duration = 10 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        // Pháo hoa từ hai bên
        confetti(Object.assign({}, defaults, { 
            particleCount, 
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } 
        }));
        confetti(Object.assign({}, defaults, { 
            particleCount, 
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } 
        }));
        
        // Hiệu ứng bong bóng/tim ở giữa
        confetti({
            ...defaults,
            particleCount: 15,
            scalar: 1.2,
            shapes: ['circle'],
            colors: ['#ff4d91', '#ff75a0', '#ffffff'],
            origin: { y: 0.7 }
        });
    }, 250);
}

function updateModal() {
    const container = document.getElementById('modalContainer');
    const contentBox = container.querySelector('.modal-content-box');

    if (currentStep < friends.length) {
        // Reset animation để mỗi lần hiện modal mới sẽ có hiệu ứng "nổi lên"
        contentBox.style.animation = 'none';
        contentBox.offsetHeight; 
        contentBox.style.animation = null;

        const friend = friends[currentStep];
        document.getElementById('modalHeader').innerText = `🔐 Xác Thực Bước ${currentStep + 1}/5`;
        document.getElementById('friendImg').src = friend.img;
        document.getElementById('friendName').innerText = `Nhập Sinh Nhật ${friend.name}`;
        document.getElementById('dateInput').value = "";
        document.getElementById('errorMsg').innerText = "";
        container.style.display = 'flex';
    } else {
        document.getElementById('modalContainer').style.display = 'none';
        document.getElementById('letterModal').style.display = 'flex';
    }
}

document.getElementById('openBtn').onclick = () => {
    currentStep = 0;
    updateModal();
};

// Nút đóng modal
document.querySelectorAll('.close-modal').forEach(btn => {
    btn.onclick = () => {
        document.getElementById('modalContainer').style.display = 'none';
        document.getElementById('letterModal').style.display = 'none';
        clearInterval(typingInterval);
    };
});

document.getElementById('confirmBtn').onclick = () => {
    const inputDate = document.getElementById('dateInput').value;
    const dateInput = document.getElementById('dateInput');
    const contentBox = document.querySelector('.modal-content-box');
    const error = document.getElementById('errorMsg');

    if (inputDate === friends[currentStep].date) {
        // Nếu đúng: Xóa bỏ các hiệu ứng lỗi và chuyển bước
        dateInput.classList.remove('input-error');
        error.innerText = "";
        currentStep++;
        updateModal();
    } else {
        // Nếu sai:
        error.innerText = "❤️ Nhập sai ngày sinh rùi, thử lại nhé!";
        
        // Thêm class rung và viền đỏ
        dateInput.classList.add('input-error');
        contentBox.style.animation = 'none';
        contentBox.offsetHeight; // trigger reflow
        contentBox.style.animation = 'shake 0.4s ease-in-out';

        // Xóa hiệu ứng rung sau khi chạy xong để có thể bấm lại lần sau
        setTimeout(() => {
            dateInput.classList.remove('input-error');
        }, 500);
    }
};

function startTyping() {
    const display = document.getElementById('letterContent');
    document.getElementById('startBtn').style.display = 'none';
    document.getElementById('showAllBtn').style.display = 'inline-block';
    
    let i = 0;
    display.innerText = "";
    clearInterval(typingInterval);
    typingInterval = setInterval(() => {
        if (i < letterText.length) {
            display.innerText += letterText[i];
            i++;
            display.scrollTop = display.scrollHeight;
        } else {
            clearInterval(typingInterval);
            celebrate(); // Tung pháo hoa khi gõ xong
        }
    }, 45);
}

document.getElementById('startBtn').onclick = startTyping;

document.getElementById('showAllBtn').onclick = () => {
    clearInterval(typingInterval);
    document.getElementById('letterContent').innerText = letterText;
    document.getElementById('showAllBtn').style.display = 'none';
    celebrate(); // Tung pháo hoa khi hiện tất cả
};