document.addEventListener('DOMContentLoaded', function () {
    const pdfFileInput = document.getElementById('pdf-file');
    const pdfContainer = document.getElementById('pdf-container');
    const editButton = document.getElementById('edit-button');
    const downloadLink = document.getElementById('download-link');
    let pdfDoc = null;
    let pageNum = 1;
    const scale = 1.5;

    // ファイル選択時にPDFを表示します
    pdfFileInput.addEventListener('change', function () {
        const file = pdfFileInput.files[0];
        const fileReader = new FileReader();

        fileReader.onload = function () {
            const typedArray = new Uint8Array(this.result);
            pdfjsLib.getDocument(typedArray).promise.then(function (pdfDoc_) {
                pdfDoc = pdfDoc_;
                renderPage(pageNum);
                editButton.style.display = 'inline-block';
            });
        };

        fileReader.readAsArrayBuffer(file);
    });

    // PDFを表示する関数
    function renderPage(num) {
        pdfDoc.getPage(num).then(function (page) {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const viewport = page.getViewport({ scale });

            canvas.height = viewport.height;
            canvas.width = viewport.width;

            pdfContainer.innerHTML = '';
            pdfContainer.appendChild(canvas);

            page.render({
                canvasContext: ctx,
                viewport: viewport
            });
        });
    }

    // 編集ボタンがクリックされたときの処理
    editButton.addEventListener('click', function () {
        // ここに編集機能の実装を追加します
        // ユーザーが編集を行い、変更を保存できるようにします
        // 編集が完了したらダウンロードリンクを表示します
        downloadLink.style.display = 'inline-block';
    });

    // ダウンロードリンクの設定
    downloadLink.addEventListener('click', function () {
        // ここに編集済みのPDFファイルをダウンロードする処理を追加します
    });
});
