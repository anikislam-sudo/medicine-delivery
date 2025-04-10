import React from "react";
import classes from "./MedicineOrder.module.css";
import Searchbar from "../Searchbar/Searchbar";
const MedicineOrder = ({
  data,
  cross,
  search,
  searchHide,
  setSearchHide,
  setSearch,
  setCross,
  handleSearchChange,
}) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.searchSection}>
        <h2>Search Your Prescribe Medicine</h2>
        <p>Know The Best Price Of Your Medicine</p>
        <div className={classes.searchContainer}>
          <Searchbar
            placeholder={"Search medicines by name, generic or price"}
            value={search}
            onChange={handleSearchChange}
            onClick={() => {
              setSearchHide(false);
              setCross(false);
              setSearch("");
            }}
            cross={cross}
          />
        </div>
        <div className={classes.show}>
          {searchHide && (
            <div className={classes.medicineShow}>
              {data &&
                data.map((info, i) => (
                  <div className={classes.optSelect} key={i}>
                    <div>
                      <div>
                        <h3>
                          {info?.name} - ৳{info?.unit_price}
                        </h3>
                        <span>
                          {info?.generic} | {info?.form} | {info?.strength}
                        </span>{" "}
                        <br />
                        <span>{info?.pharmaceuticals}</span>
                      </div>
                      <div>
                        <button
                          onClick={() => {
                            setSearchHide(false);
                            setCross(false);
                            setSearch("");
                            setMedicineLines((prev) => [...prev.concat(info)]);
                          }}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicineOrder;
