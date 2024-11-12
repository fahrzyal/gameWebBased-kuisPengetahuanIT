

const questions = [
    { question: "Apa fungsi utama dari CPU dalam sebuah komputer?", options: ["Menyimpan data", "Menjalankan program dan memproses data", "Menampilkan gambar di layar", " Menghubungkan komputer ke internet"], answer: "Menjalankan program dan memproses data" },
    { question: "Di bawah ini, manakah yang termasuk sistem operasi?", options: ["Microsoft Word", "Microsoft", "Windows", "Google Chrome"], answer: "Windows" },
    { question: "Bahasa pemrograman apa yang digunakan terutama untuk pengembangan aplikasi berbasis web?", options: ["C++", "HTML", "Python", "Java"], answer: "HTML" },
    { question: "Lihat gambar di bawah ini. Perangkat apa yang ditunjukkan pada gambar?", options: ["Monitor", "RAM", "CPU", "Hard Drive"], answer: "CPU" },
    { question: "Lihat gambar berikut. Fungsi apa yang digunakan untuk menemukan panjang dari sebuah string dalam bahasa Python?", options: ["length()", "count()", " size()", "len()"], answer: "len()" },
    { question: "Dalam sebuah database relasional, apa fungsi dari indeks pada tabel?", options: ["Untuk menyimpan data sementara", "Untuk mengurutkan data secara otomatis saat data dimasukkan", "Untuk mempercepat akses dan pencarian data dalam tabel", "Untuk menggabungkan beberapa tabel sekaligus"], answer: "Untuk mempercepat akses dan pencarian data dalam tabel" },
    { question: "Perhatikan pernyataan SQL berikut. Apa fungsi dari perintah JOIN dalam SQL?", options: ["Menggabungkan dua atau lebih tabel berdasarkan kolom terkait", "Menghapus data dari tabel", "Menghitung jumlah total baris dalam tabel", "Membuat tabel baru di database"], answer: "Menggabungkan dua atau lebih tabel berdasarkan kolom terkait" },
    { question: "Dalam konteks keamanan jaringan, apa fungsi dari firewall?", options: ["Menyimpan data sementara dalam jaringan", "Mencegah akses yang tidak sah ke atau dari jaringan", "Mengatur urutan paket data yang dikirimkan", "Memonitor pengguna di jaringan lokal"], answer: "Mencegah akses yang tidak sah ke atau dari jaringan" },
    { question: "Pada gambar berikut, fungsi berikut dideklarasikan dalam bahasa JavaScript. Apa yang akan dikembalikan oleh fungsi ini jika kita memanggilnya dengan calculateSum(5, 10)?", options: ["15", "10", "5", "Error  "], answer: "15" },
    { question: "Berdasarkan kode dalam gambar, manakah opsi yang benar untuk mendeklarasikan variabel age dalam bahasa C++?", options: ["age = 25;", "int age = 25;", "var age = 25;", "age : int = 25;"], answer: "int age = 25;" },
    { question: "Pada gambar berikut, apa fungsi dari operator ++ pada kode C++ ini?", options: ["Mengurangi nilai x sebanyak 1", "Menampilkan nilai x tanpa perubahan", "Menambah nilai x sebanyak 1", "Indonesia"], answer: "Menambah nilai x sebanyak 1" },
    { question: "Perhatikan kode dalam gambar berikut ini. Apa output dari kode Python berikut?", options: ["5", "120", "25", "24"], answer: "120" },
    { question: 'Dalam konteks jaringan komputer, apa yang dimaksud dengan "Subnet Mask"?', options: ["Alamat unik yang digunakan untuk mengidentifikasi perangkat pada jaringan", "Sebuah nilai yang menentukan bagian jaringan dan host pada alamat IP", "Protokol untuk menghubungkan komputer ke internet", "Proses untuk mengubah alamat IP menjadi alamat fisik"], answer: "Sebuah nilai yang menentukan bagian jaringan dan host pada alamat IP" },
    { question: 'Pada bahasa pemrograman C++, konsep "friend class" digunakan untuk:', options: ["Mengizinkan kelas lain mengakses anggota private atau protected dari kelas lain", "Menggabungkan dua kelas menjadi satu", "Mewarisi semua anggota dari kelas induk", "Mencegah akses ke anggota private dalam suatu kelas"], answer: "Mengizinkan kelas lain mengakses anggota private atau protected dari kelas lain" },
    { question: "Dalam basis data, apa tujuan dari normalisasi hingga bentuk normal ketiga (3NF)?", options: ["Mengurangi duplikasi data dan memastikan data terkait disimpan secara terpisah", "Menghapus semua data dari tabel", "Menggabungkan tabel menjadi satu tabel besar", "Menambahkan indeks untuk mempercepat akses data"], answer: "Mengurangi duplikasi data dan memastikan data terkait disimpan secara terpisah" }
];

let currentQuestion = 0;
let score = 0;

// Audio Elements
const backsound = new Audio("sounds/backsound.mp3");
const clickSound = new Audio("sounds/clickSound.mp3"); // Sound effect universal untuk semua tombol
const correctSound = new Audio("sounds/correct.mp3");
const wrongSound = new Audio("sounds/wrong.mp3");
const scoreLowSound = new Audio("sounds/score_low.mp3");     // Backsound untuk skor rendah
const scoreMediumSound = new Audio("sounds/score_medium.mp3"); // Backsound untuk skor menengah
const scoreHighSound = new Audio("sounds/score_high.mp3");     // Backsound untuk skor tinggi
const scoreTopSound = new Audio("sounds/score_top.mp3");       // Backsound untuk skor tertinggi

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const scoreElement = document.getElementById("score");
const nextBtn = document.getElementById("nextBtn");
const endButtons = document.getElementById("endButtons");
const startButton = document.getElementById("startButton");
const quizScreen = document.getElementById("quizScreen");
const startScreen = document.getElementById("startScreen");

// Function to start the quiz and play the backsound
function startQuiz() {
    clickSound.play(); // Main sound effect saat tombol mulai ditekan
    backsound.loop = true; // Atur backsound untuk berulang

    // Coba untuk memutar backsound dan tangani jika ada error
    backsound.play().catch(error => {
        console.error("Backsound error:", error);
        alert("Silakan pastikan suara tidak dibisukan dan reload halaman.");
    });

    startScreen.style.display = "none"; // Sembunyikan halaman mulai
    quizScreen.style.display = "block"; // Tampilkan kuis
    loadQuestion();
}

// Load the first question
function loadQuestion() {
    const q = questions[currentQuestion];
    questionElement.textContent = q.question;
    optionsElement.innerHTML = "";

    q.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.addEventListener("click", () => selectAnswer(option));
        optionsElement.appendChild(button);
    });
}

function selectAnswer(answer) {
    const q = questions[currentQuestion];
    if (answer === q.answer) {
        score++;
        scoreElement.textContent = `Score: ${score}`;
        correctSound.play();
    } else {
        wrongSound.play();
    }
    Array.from(optionsElement.children).forEach(button => {
        button.disabled = true;
        if (button.textContent === q.answer) {
            button.style.backgroundColor = "#4CAF50";
            button.style.color = "#fff";
        } else {
            button.style.backgroundColor = "#f44336";
            button.style.color = "#fff";
        }
    });
    nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", () => {
    clickSound.play(); // Sound effect untuk tombol Lanjut
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
        nextBtn.style.display = "none";
    } else {
        showFinalScore();
    }
});

function showFinalScore() {
    backsound.pause();
    backsound.currentTime = 0;

    let message = "";
    if (score <= 3) {
        message = "Skor Anda rendah! Ayo coba lagi dan tingkatkan pengetahuan Anda.";
        scoreLowSound.play();
    } else if (score <= 6) {
        message = "Lumayan! Pengetahuan Anda cukup baik, tetapi masih bisa ditingkatkan.";
        scoreMediumSound.play();
    } else if (score <= 8) {
        message = "Bagus sekali! Anda memiliki pengetahuan yang luas.";
        scoreHighSound.play();
    } else {
        message = "Luar biasa! Anda mencapai skor tertinggi! Hebat!";
        scoreTopSound.play();
    }

    questionElement.textContent = `Quiz selesai!`;
    questionElement.textContent = `${message}`;
    optionsElement.innerHTML = "";
    nextBtn.style.display = "none";
    endButtons.style.display = "flex"; // Tampilkan tombol akhir
}

function restartQuiz() {
    clickSound.play(); // Sound effect untuk tombol Ulangi
    currentQuestion = 0;
    score = 0;
    stopAllScoreSounds();
    backsound.currentTime = 0; // Reset backsound
    backsound.play(); // Putar ulang backsound
    loadQuestion();
    endButtons.style.display = "none";
    scoreElement.textContent = `Score: ${score}`;
}

function goHome() {
    clickSound.play(); // Sound effect untuk tombol Kembali
    setTimeout(() => {
        window.location.href = "index.html";
    }, 500);
}

function stopAllScoreSounds() {
    scoreLowSound.pause();
    scoreLowSound.currentTime = 0;
    scoreMediumSound.pause();
    scoreMediumSound.currentTime = 0;
    scoreHighSound.pause();
    scoreHighSound.currentTime = 0;
    scoreTopSound.pause();
    scoreTopSound.currentTime = 0;
}

// Tambahkan event listener untuk tombol mulai
startButton.addEventListener("click", startQuiz);

loadQuestion();
