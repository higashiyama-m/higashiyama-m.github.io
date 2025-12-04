// 基本クラス名のデータ
const basicClasses = [
    { jp: "全体を囲む (Wrapper)", en: "wrapper" },
    { jp: "全体を囲む (Container)", en: "container" },
    { jp: "ヘッダー部", en: "header" },
    { jp: "フッター部", en: "footer" },
    { jp: "メインコンテンツ", en: "main-content" },
    { jp: "サイドバー", en: "sidebar" },
    { jp: "カード/要素", en: "card" },
    { jp: "ボタン", en: "btn" }
];

// 日本語から英語へのマッピング (簡易辞書)
const translationMap = {
    "見出し": ["heading", "title"],
    "記事一覧": ["article-list", "posts"],
    "商品一覧": ["product-list", "items"],
    "お知らせ": ["news", "topics"],
    "ナビゲーション": ["nav", "global-nav"],
    "コンテンツ": ["content", "section-body"],
    "画像": ["img-box", "figure"],
    "フォーム": ["form-group", "input-box"],
};

// --- 初期リストの生成 ---
const basicListElement = document.getElementById('basicList');
basicClasses.forEach(item => {
    const classItem = document.createElement('div');
    classItem.className = 'class-item';
    classItem.innerHTML = `
        <span>${item.jp}: <strong>${item.en}</strong></span>
        <button onclick="copyText('${item.en}')">コピー</button>
    `;
    basicListElement.appendChild(classItem);
});

// --- コピー機能 ---
function copyText(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert(`'${text}' をコピーしました！`);
    }).catch(err => {
        console.error('コピーに失敗しました', err);
    });
}

function copyToClipboard(elementId) {
    const textToCopy = document.getElementById(elementId).textContent;
    copyText(textToCopy);
}


// --- 翻訳提案機能 ---
document.getElementById('japaneseInput').addEventListener('input', function(e) {
    const input = e.target.value.trim();
    const outputElement = document.getElementById('suggestedName');
    
    // マッピングから検索
    const suggested = translationMap[input];

    if (suggested && suggested.length > 0) {
        // 最初の提案をメインに表示
        outputElement.textContent = suggested[0];
    } else {
        // 適切な提案がない場合、または空の場合
        outputElement.textContent = '--';
    }
});
