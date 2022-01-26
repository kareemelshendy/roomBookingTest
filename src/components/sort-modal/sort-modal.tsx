import { Dispatch, SetStateAction } from "react";
import { Modal } from "react-bootstrap";
import { Control, Controller, FieldValues, UseFormHandleSubmit } from "react-hook-form";
import Select from "react-select";
import { Button } from "../button/button";
import { Map } from "../map/map";

interface Props {
  options: {
    value: string;
    label: string;
  }[];
  handleButton(data: any): void;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  showSort: boolean;
  setShowSort: Dispatch<SetStateAction<boolean>>;
  control: Control<FieldValues, object>;
}

export const SortModal = ({ options, handleSubmit, handleButton, setShowSort, showSort, control }: Props) => {
  return (
    <Modal show={showSort} onHide={() => setShowSort(false)} dir="rtl">
      <form action="" onSubmit={handleSubmit(handleButton)}>
        <Modal.Header closeButton dir="ltr">
          <Modal.Title>ترتيب بـ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="sort">
            <h4 className="label">السعر</h4>
            <Controller
              name="order"
              control={control}
              defaultValue={options[0].value}
              render={({ field }) => {
                return <Select id="long-value-select" instanceId="long-value-select" options={options} isRtl={true} defaultValue={options[0]} classNamePrefix="sort-select" onChange={(val) => field.onChange(val?.value)} />;
              }}
            />
          </div>
          <div className="map_cont">
            <h4 className="heading-4 heading-bold">
              العنوان علي الخريطة
              <span>*</span>
            </h4>
            <div className="map">
              <Map borderRadius="border-r" />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="button">
            <Button btnPrimary="btn-primary" width="w-100" type="submit">
              إظهار النتائج
            </Button>
          </div>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
