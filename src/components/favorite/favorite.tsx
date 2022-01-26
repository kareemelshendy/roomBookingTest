import { Room } from "../../models";
import { NoData } from "../no-data/no-data";
import { RoomsGrid } from "../rooms-grid/rooms-grid";

interface Props {
  rooms: Room[] | undefined;
  isLoading: boolean;
}

export const FavoriteComponent = ({ rooms, isLoading }: Props) => {
  return (
    <div className="container mt-4 " dir="rtl">
      <div className="row">
        <div className="mb-2">
          <h2 className="heading heading-3 heading-bold" dir="rtl">
            المفضلات
          </h2>
        </div>
        {rooms?.length === 0 ? <NoData title="لا يوجد غرف" /> : <RoomsGrid rooms={rooms} />}
      </div>
    </div>
  );
};
