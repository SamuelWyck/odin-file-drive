(function() {
    const userMenu = document.querySelector(".user-menu");
    const userMenuBtn = document.querySelector(".user-menu-btn");
    const userMenuImg = document.querySelector(".user-menu-img");
    const uploadFileInput = document.querySelector(".upload-input");
    const uploadFileForm = document.querySelector(".upload-file-form");


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
})();