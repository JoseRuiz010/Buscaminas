import Swal, { SweetAlertOptions } from "sweetalert2";

export const CustomSwal = (
  props: SweetAlertOptions,
  actionConfirmed: Function = () => {},
  actionDenied: Function = () => {}
) => {
  return Swal.fire({ ...props }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      // Swal.fire("Saved!", "", "success");
      actionConfirmed();
    } else if (result.isDenied) {
      // Swal.fire("Changes are not saved", "", "info");
      actionDenied();
    }
  });
};
