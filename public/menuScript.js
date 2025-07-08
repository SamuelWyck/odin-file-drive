(function() {
    const userMenu = document.querySelector(".user-menu");
    const userMenuBtn = document.querySelector(".user-menu-btn");
    const userMenuImg = document.querySelector(".user-menu-img");
    const uploadFileInput = document.querySelector(".upload-input");
    const uploadFileForm = document.querySelector(".upload-file-form");
    const deleteModal = document.querySelector(".delete-form-modal");
    const cancelDeleteBtn = document.querySelector(".cancel-delete-btn");
    const folderContent = document.querySelector(".folder-contents");
    const deleteNameInput = document.querySelector(".delete-name-input");
    const deleteUrlInput = document.querySelector(".delete-url-input");
    const deleteForm = document.querySelector(".delete-form");
    const createFolderModal = document.querySelector(".create-folder-modal");
    const createFolderBtn = document.querySelector(".create-folder-btn");
    const cancelFolderBtn = document.querySelector(".cancel-folder");
    const formErrors = document.querySelectorAll(".form-errors");
    const foldersDiv = document.querySelector(".folders");
    const filesDiv = document.querySelector(".files");
    const fileDetailsInput = document.querySelector(".file-edit-input");
    const fileDetailsUrlInput = document.querySelector(".file-edit-url");
    const fileDetailsDateInput = document.querySelector(".file-edit-date");
    const fileDetailsDateSpan = document.querySelector(".file-date-para :first-child");
    const fileDownloadLink = document.querySelector(".download-link");
    const fileDetailsModal = document.querySelector(".file-details-modal");
    const fileDetailsEditBtn = document.querySelector(".file-edit-btn");
    const fileDetailsOriginalInput = document.querySelector(".file-edit-original-name");
    const fileEditForm = document.querySelector(".file-edit-form");
    const realDownloadLink = document.querySelector(".download-link-hidden");
    const folderBtnImg = document.querySelector(".folder-arrow-img");
    const fileBtnImg = document.querySelector(".file-arrow-img");


    userMenuBtn.addEventListener("click",  function(event) {
        userMenu.classList.toggle("hidden");
        userMenuImg.classList.toggle("rotate");
        event.stopPropagation();
    });

    document.addEventListener("click", function(event) {
        if (event.target.matches(".user-menu")) {
            return;
        }

        userMenu.classList.add("hidden");
        userMenuImg.classList.add("rotate");
    });

    
    
    if (folderContent) {
        uploadFileInput.addEventListener("input", function() {
            uploadFileForm.submit();
        });


        folderContent.addEventListener("click", function(event) {
            if (modalsShowing()) {
                return;
            }
            if (event.target.matches(".folder-banner") || 
                event.target.matches(".file-banner") || 
                event.target.matches(".file-arrow-img") ||
                event.target.matches(".folder-arrow-img")) {
                handleFolderContentToggle(event);
                return;
            }
            if (!event.target.matches(".delete-btn") && !event.target.matches(".delete-img")) {
                return;
            }

            const target = (event.target.matches(".delete-btn")) ? event.target : event.target.parentElement;
 
            deleteForm.action = target.dataset.action;
            deleteNameInput.value = target.dataset.name;
            deleteUrlInput.value = target.dataset.url;
            deleteModal.classList.toggle("hidden");
        });


        cancelDeleteBtn.addEventListener("click", function() {
            deleteModal.classList.add("hidden");
        });


        createFolderBtn.addEventListener("click", function() {
            if (modalsShowing()) {
                return;
            }

            if (formErrors) {
                formErrors.forEach(function(ele) {
                    ele.style.display = "none";
                });
            }
            createFolderModal.classList.remove("hidden");
        });


        cancelFolderBtn.addEventListener("click", function() {
            createFolderModal.classList.add("hidden");
        });


        foldersDiv.addEventListener("click", function(event) {
            if (modalsShowing()) {
                return;
            }
            if (isContentCard(event)) {
                handleFolderCardClick(event);
            }
        });


        filesDiv.addEventListener("click", function(event) {
            if (modalsShowing()) {
                return;
            }
            if (isContentCard(event)) {
                handleFileCardCLick(event);
            }
        });

        fileDetailsModal.addEventListener("click", function(event) {
            const target = event.target;
            if (target.matches(".file-details-exit-btn")) {
                fileDetailsModal.classList.add("hidden");

                fileDetailsInput.disabled = true;
                fileDetailsEditBtn.textContent = "Edit";

            } else if (target.matches(".file-edit-btn")) {
                const startEdit = (target.textContent === "Edit") ? true : false;
                if (startEdit) {
                    target.textContent = "Cancel";
                    fileDetailsInput.disabled = false;
                    fileDetailsInput.focus();
                } else {
                    fileDetailsInput.disabled = true;
                    target.textContent = "Edit";
                    fileDetailsInput.value = fileDetailsInput.dataset.name;
                }
            } else if (target.matches(".download-link")) {
                handleFileDownload(event);
            }
        });


        fileDetailsInput.addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
                fileEditForm.submit();
            }
        });
    }


    function modalsShowing() {
        if (!deleteModal.classList.contains("hidden") || 
            !createFolderModal.classList.contains("hidden") ||
            !fileDetailsModal.classList.contains("hidden")) {
            return true;
        }
        return false;
    };


    function isContentCard(event) {
        if (event.target.matches(".content-card") || 
            event.target.matches(".content-card-name") || 
            (event.target.parentElement.matches(".content-card") && 
            !event.target.matches(".delete-btn"))) {
            return true;
        }
        return false;
    };


    function getContentCardElement(event) {
        const elementsAtPoint = document.elementsFromPoint(
            event.clientX, event.clientY
        );

        for (let ele of elementsAtPoint) {
            if (ele.matches(".content-card")) {
                return ele;
            }
        }
    };


    function handleFolderCardClick(event) {
        const target = getContentCardElement(event);
        window.location.href = target.dataset.url;
    };


    function handleFileCardCLick(event) {
        const target = getContentCardElement(event);

        if (formErrors) {
            formErrors.forEach(function(ele) {
                ele.style.display = "none";
            });
        }

        fileDetailsInput.value = target.dataset.name;
        fileDetailsDateSpan.textContent = target.dataset.date;
        fileDownloadLink.href = `/download?path=${target.dataset.path}&name=${target.dataset.name}`;
        fileDetailsInput.dataset.name = target.dataset.name;
        fileDetailsUrlInput.value = target.dataset.path;
        fileDetailsDateInput.value = target.dataset.date;
        fileDetailsOriginalInput.value = target.dataset.name;

        fileDetailsModal.classList.remove("hidden");
    };


    function handleFileDownload(event) {
        event.preventDefault();
        
        fetch(event.target.href)
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            console.log(response)
            realDownloadLink.href = response;
            realDownloadLink.click();
        });
    };


    function handleFolderContentToggle(event) {
        if (event.target.matches(".folder-banner") ||
            event.target.matches(".folder-arrow-img")) {
            foldersDiv.classList.toggle("hidden");
            folderBtnImg.classList.toggle("rotate");
        } else {
            filesDiv.classList.toggle("hidden");
            fileBtnImg.classList.toggle("rotate");
        }
    };
})();