const fileInput = document.getElementById("fileInput");
const cameraInput = document.getElementById("cameraInput");
const dropZone = document.getElementById("dropZone");
const uploadContent = document.getElementById("uploadContent");
const previewWrap = document.getElementById("previewWrap");
const previewImage = document.getElementById("previewImage");
const fileStatus = document.getElementById("fileStatus");
const analyzeButton = document.getElementById("analyzeButton");
const removeImage = document.getElementById("removeImage");

let selectedFile = null;
let previewUrl = null;

function useFile(file) {
  if (!file) return;

  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (!allowedTypes.includes(file.type)) {
    alert("Vui lòng chọn ảnh JPG, PNG hoặc WEBP.");
    return;
  }
  if (file.size > 10 * 1024 * 1024) {
    alert("Ảnh quá lớn. Vui lòng chọn ảnh nhỏ hơn 10MB.");
    return;
  }

  selectedFile = file;
  if (previewUrl) URL.revokeObjectURL(previewUrl);
  previewUrl = URL.createObjectURL(file);
  previewImage.src = previewUrl;
  uploadContent.classList.add("hidden");
  previewWrap.classList.remove("hidden");
  fileStatus.textContent = `Đã chọn: ${file.name}`;
  analyzeButton.disabled = false;
}

function clearFile() {
  selectedFile = null;
  fileInput.value = "";
  cameraInput.value = "";
  previewImage.removeAttribute("src");
  if (previewUrl) URL.revokeObjectURL(previewUrl);
  previewUrl = null;
  previewWrap.classList.add("hidden");
  uploadContent.classList.remove("hidden");
  fileStatus.textContent = "Chưa có hình ảnh nào được chọn.";
  analyzeButton.disabled = true;
}

fileInput.addEventListener("change", event => useFile(event.target.files[0]));
cameraInput.addEventListener("change", event => useFile(event.target.files[0]));
removeImage.addEventListener("click", clearFile);

["dragenter", "dragover"].forEach(type => {
  dropZone.addEventListener(type, event => {
    event.preventDefault();
    dropZone.classList.add("dragover");
  });
});
["dragleave", "drop"].forEach(type => {
  dropZone.addEventListener(type, event => {
    event.preventDefault();
    dropZone.classList.remove("dragover");
  });
});
dropZone.addEventListener("drop", event => useFile(event.dataTransfer.files[0]));

analyzeButton.addEventListener("click", () => {
  if (!selectedFile) return;
  alert("Bước 1 hoàn tất: ảnh đã được chọn thành công! Ở bước tiếp theo, chúng ta sẽ kết nối AI để nhận diện món ăn và phân tích dinh dưỡng.");
});
