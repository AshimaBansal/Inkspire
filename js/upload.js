
const UPLOAD_PRICES = { 'A4': 799, 'A3': 1199, 'A2': 1699, '50x70': 1999 };

let uploadedFile = null;
let uploadedFileURL = null;

document.addEventListener('DOMContentLoaded', () => {
    const dropzone = document.getElementById('dropzone');
    const fileInput = document.getElementById('file-input');
    const filePreview = document.getElementById('file-preview');
    const previewImg = document.getElementById('preview-img');
    const previewName = document.getElementById('preview-name');
    const previewSize = document.getElementById('preview-size');
    const removeBtn = document.getElementById('remove-file-btn');
    const uploadOptions = document.getElementById('upload-options');
    const pricePrev = document.getElementById('upload-price-preview');
    const priceVal = document.getElementById('upload-price-val');
    const addCartBtn = document.getElementById('upload-add-cart-btn');
    const sizeSelect = document.getElementById('upload-size');
    const productTypeSelect = document.getElementById('product-type');
    const materialSelect = document.getElementById('upload-material');

    productTypeSelect.addEventListener('change', () => {
        const is3d = productTypeSelect.value === '3d-print';
        materialSelect.innerHTML = is3d
            ? '<option>PLA</option><option>Resin</option><option>ABS</option>'
            : '<option>Matte</option><option>Glossy</option><option>Canvas</option>';
    });

    sizeSelect.addEventListener('change', updatePriceDisplay);

    function updatePriceDisplay() {
        const price = UPLOAD_PRICES[sizeSelect.value] || 799;
        priceVal.textContent = `₹${price.toLocaleString('en-IN')}`;
    }

    dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('drag-over');
    });

    dropzone.addEventListener('dragleave', () => {
        dropzone.classList.remove('drag-over');
    });

    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('drag-over');
        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
    });

    fileInput.addEventListener('change', () => {
        const file = fileInput.files[0];
        if (file) handleFile(file);
    });

    function handleFile(file) {
        const allowed = ['image/jpeg', 'image/png', 'application/pdf', 'model/stl', '.stl'];
        const ext = file.name.split('.').pop().toLowerCase();
        const allowedExts = ['jpg', 'jpeg', 'png', 'pdf', 'stl'];

        if (!allowedExts.includes(ext)) {
            showToast('File type not supported. Use JPG, PNG, PDF, or STL.');
            return;
        }

        if (file.size > 50 * 1024 * 1024) {
            showToast('File too large. Max size is 50MB.');
            return;
        }

        uploadedFile = file;

       
        if (['jpg', 'jpeg', 'png'].includes(ext)) {
            if (uploadedFileURL) URL.revokeObjectURL(uploadedFileURL);
            uploadedFileURL = URL.createObjectURL(file);
            previewImg.src = uploadedFileURL;
            previewImg.style.display = 'block';
        } else {
           
            previewImg.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 256 256"><rect width="256" height="256" fill="%23E8E4DE" rx="8"/><text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-size="40" fill="%23C8A96E">' + ext.toUpperCase() + '</text></svg>';
            previewImg.style.display = 'block';
        }

        previewName.textContent = file.name;
        previewSize.textContent = formatFileSize(file.size);

        filePreview.classList.add('show');
        uploadOptions.style.display = 'grid';
        pricePrev.style.display = 'block';
        updatePriceDisplay();
    }

    removeBtn.addEventListener('click', () => {
        uploadedFile = null;
        if (uploadedFileURL) {
            URL.revokeObjectURL(uploadedFileURL);
            uploadedFileURL = null;
        }
        fileInput.value = '';
        filePreview.classList.remove('show');
        uploadOptions.style.display = 'none';
        pricePrev.style.display = 'none';
    });

    addCartBtn.addEventListener('click', () => {
        if (!uploadedFile) return;
        const size = sizeSelect.value;
        const material = materialSelect.value;
        const type = productTypeSelect.value;
        const price = UPLOAD_PRICES[size] || 799;
        const qty = parseInt(document.getElementById('upload-qty').value) || 1;

        addToCart({
            id: 'custom-' + Date.now(),
            title: 'Custom Upload: ' + uploadedFile.name.split('.')[0],
            image: uploadedFileURL || '',
            price: price,
            size: size,
            material: material,
            category: type,
            photographer: 'You',
            quantity: qty
        });
    });

    function formatFileSize(bytes) {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / 1048576).toFixed(1) + ' MB';
    }
});
