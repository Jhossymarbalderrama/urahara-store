import Swal from 'sweetalert2'

export function initSweet(title, text, ico, textBtn) {
    Swal.fire({
        title: title,
        text: text,
        icon: ico,
        confirmButtonText: textBtn
    });
}