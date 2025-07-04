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
    const formErrors = document.querySelector(".form-errors");


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


    if (uploadFileForm) {
        uploadFileInput.addEventListener("input", function() {
            uploadFileForm.submit();
        });
    }


    if (deleteModal) {
        folderContent.addEventListener("click", function(event) {
            if (!deleteModal.classList.contains("hidden") || 
                !createFolderModal.classList.contains("hidden")) {
                return;
            }

            if (event.target.matches(".content-card") || 
                event.target.matches(".content-card-name") || 
                (event.target.parentElement.matches(".content-card") && 
                !event.target.matches(".delete-btn"))) {
                handleContentCardClick(event);
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
            if (!deleteModal.classList.contains("hidden")) {
                return;
            }
            if (!createFolderModal.classList.contains("hidden")) {
                return;
            }

            if (formErrors) {
                formErrors.style.display = "none";
            }
            createFolderModal.classList.remove("hidden");
        });

        cancelFolderBtn.addEventListener("click", function() {
            createFolderModal.classList.add("hidden");
        });
    }


    function handleContentCardClick(event) {
        const elementsAtPoint = document.elementsFromPoint(
            event.clientX, event.clientY
        );

        let target = null;
        for (let ele of elementsAtPoint) {
            if (ele.matches(".content-card")) {
                target = ele;
                break;
            }
        }

        window.location.href = target.dataset.url;
    };
})();