// script.js

// --- データ定義 ---

// 基本クラス名のデータ
const basicClasses = [
    { jp: "全体を囲む (Wrapper)", en: "wrapper" },
    { jp: "中央寄せ (Container)", en: "container" },
    { jp: "ヘッダー部", en: "header" },
    { jp: "フッター部", en: "footer" },
    { jp: "メインコンテンツ", en: "main-content" },
    { jp: "サイドバー", en: "sidebar" },
    { jp: "ナビゲーション", en: "nav" },
    { jp: "カード型要素", en: "card" },
    { jp: "ボタン", en: "btn" }
];

// 日本語から英語へのマッピング (簡易辞書)
const translationMap = {
    "見出し": "heading",
    "タイトル": "title",
    "記事一覧": "article-list",
    "商品一覧": "product-list",
    "お知らせ": "news-list",
    "お客様の声": "testimonial",
    "よくある質問": "faq-section",
    "連絡先": "contact-form",
    "広告": "banner-ad"
};


// --- ユーティリティ機能 ---

/**
 * テキストをクリップボードにコピーし、アラートを表示する
 * @param {string} text - コピーするテキスト
 */
function copyText(text) {
    if (!navigator.clipboard) {
        // フォールバック（非推奨）
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            showAlert(`'${text}' をコピーしました！`);
        } catch (err) {
            console.error('コピーに失敗しました', err);
        }
        document.body.removeChild(textArea);
        return;
    }
    
    navigator.clipboard.writeText(text).then(() => {
        showAlert(`'${text}' をコピーしました！`);
    }).catch(err => {
        console.error('コピーに失敗しました', err);
    });
}

/**
 * コピー成功アラートを一時的に表示する
 * @param {string} message - アラートに表示するメッセージ
 */
function showAlert(message) {
    let alertDiv = document.querySelector('.copy-alert');
    if (!alertDiv) {
        alertDiv = document.createElement('div');
        alertDiv.className = 'copy-alert';
        document.body.appendChild(alertDiv);
    }
    alertDiv.textContent = message;
    alertDiv.classList.add('show');
    
    // 2秒後にアラートを非表示にする
    setTimeout(() => {
        alertDiv.classList.remove('show');
    }, 2000);
}


// --- メイン機能 ---

/**
 * 基本クラス名のリストをHTMLに生成する
 */
function generateBasicList() {
    const basicListElement = document.getElementById('basicList');
    basicClasses.forEach(item => {
        const classItem = document.createElement('div');
        classItem.className = 'class-item';
        classItem.innerHTML = `
            <span>${item.jp}: <strong>${item.en}</strong></span>
            <button class="copy-btn" data-class-name="${item.en}">コピー</button>
        `;
        basicListElement.appendChild(classItem);
    });
    
    // イベントリスナーを一度に設定
    document.querySelectorAll('.copy-btn').forEach(button => {
        button.addEventListener('click', () => {
            copyText(button.dataset.className);
        });
    });
}

/**
 * 日本語入力に基づいてClass名を提案し表示する
 */
function handleTranslationInput(e) {
    const input = e.target.value.trim();
    const outputElement = document.getElementById('suggestedName');
    
    // マッピングから検索
    const suggested = translationMap[input];

    if (suggested) {
        outputElement.textContent = suggested;
    } else {
        // 適切な提案がない場合
        outputElement.textContent = '--';
    }
}


// --- イベントリスナーの設定 (DOM読み込み完了後) ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. 基本リストを生成
    generateBasicList();

    // 2. 翻訳機能のリスナー
    document.getElementById('japaneseInput').addEventListener('input', handleTranslationInput);
    
    // 3. 提案された名前のコピーボタン
    document.getElementById('copySuggestedBtn').addEventListener('click', () => {
        const textToCopy = document.getElementById('suggestedName').textContent;
        if (textToCopy !== '--') {
            copyText(textToCopy);
        } else {
            showAlert('コピーするクラス名がありません。');
        }
    });
});
