const friends = [
    { name: "Thanh Phương", img: "image/phuong.jpg", date: "2004-09-24" },
    { name: "Đạt Đần", img: "image/dat.jpg", date: "2004-08-04" },
    { name: "Thu Thủy", img: "image/thuy.jpg", date: "2004-05-25" },
    { name: "Thảo Chi", img: "image/chi.jpg", date: "2004-02-10" },
    { name: "Trọng Tuyền", img: "image/tuyen.jpg", date: "2004-01-31" }
];

const letterText = `Gửi Thủy Linh – đứa bạn thân ngốc nghếch nhất mà tao từng thương,

Hôm nay là sinh nhật mày, và tao nghĩ nếu không viết cho mày vài dòng thì đúng là thiếu sót lớn trong cuộc đời tao. Vì thật lòng mà nói, không phải ai cũng có may mắn có một người bạn vừa đần, vừa ngốc, vừa hài hước, lại vừa khiến người khác không thể không quý như mày.

Tao không nhớ chính xác tụi mình thân nhau từ khi nào, chỉ nhớ là càng ngày tao càng quen với hình ảnh một Thủy Linh rất đặc trưng: suy nghĩ thì đơn giản, phản ứng thì chậm chậm, nói chuyện nhiều lúc ngơ ngác như chưa hiểu chuyện đời. Có những khoảnh khắc tao nhìn mày mà chỉ biết bật cười, tự hỏi không hiểu sao trên đời lại có một đứa ngốc một cách tự nhiên đến vậy. Nhưng cũng chính sự ngốc nghếch đó làm cho mày trở nên khác biệt và đáng yêu theo một cách rất riêng.

Mày là kiểu người không cần cố gắng để gây cười, nhưng lại luôn làm người khác vui. Những câu nói vô tri, những hành động trẻ con, những lần phản ứng sai sai của mày – tất cả đều vô tình trở thành niềm vui cho những người ở cạnh. Có lúc mày như một đứa trẻ chưa kịp lớn, luôn sống bằng cảm xúc, bằng sự chân thành, không che giấu, không phòng bị. Và giữa một thế giới mà ai cũng phải học cách để phòng nhau, thì sự trong trẻo đó của mày thật sự rất quý giá.

Tao biết mày không phải lúc nào cũng vui. Đằng sau cái vẻ ngoài ngốc nghếch và hay cười ấy, mày cũng có những lúc buồn, những lúc tủi thân, những lúc cảm thấy mình không đủ tốt. Nhưng mày hiếm khi nói ra, mà thường chọn cách cười cho qua, giả vờ như không có gì. Chính điều đó khiến tao thương mày nhiều hơn, vì mày mạnh mẽ theo một cách rất lặng lẽ.

Cảm ơn mày vì đã là một người bạn rất thật trong cuộc đời tao. Cảm ơn vì đã không thay đổi để trở nên "khôn ngoan" hơn theo cách của người lớn, mà vẫn giữ được nét trẻ con, ngốc nghếch nhưng tử tế. Cảm ơn vì những lần ở bên nhau, dù chẳng làm gì lớn lao, nhưng chỉ cần có mày là mọi thứ cũng trở nên dễ chịu hơn rất nhiều.

Sinh nhật này, tao mong mày sẽ luôn được yêu thương đúng với con người của mày. Mong mày vẫn ngốc nghếch vừa đủ để giữ được sự đáng yêu, nhưng cũng đủ mạnh mẽ để bảo vệ bản thân. Mong mày cười nhiều hơn, buồn ít hơn, và nếu có buồn thì nhớ rằng luôn có tao ở đây, sẵn sàng nghe mày nói những điều ngớ ngẩn nhất.

Chúc mừng sinh nhật Thủy Linh. Cảm ơn vì đã xuất hiện trong cuộc đời tao với tư cách là một người bạn không hoàn hảo, nhưng không thể thay thế. 💛🎂`;

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