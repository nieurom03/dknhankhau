import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Input,
  InputLabel,
  NativeSelect,
  TextField,
} from "@material-ui/core";
import { getDataList } from "../api";

export default function NewPerson() {
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [valueCity, setValueCity] = useState("");
  const [valueDistrict, setValueDistrict] = useState("");
  const [valueWard, setValueWard] = useState("");

  useEffect(() => {
    getDataList().then((res) => {
      //console.log({ res });
      setCities(res.data);
    });
  }, []);

  const handleOnSelectedCity = (e) => {
    //console.log(e.target.value);
    setValueCity(e.target.value);

    // find distinct by city code
    setValueDistrict("");
    setDistricts([]);

    setValueWard("");
    setWards([]);
  };

  useEffect(() => {
    // console.log({ cities });
    if (valueCity) {
      const dis = cities.find((city) => city.code === 1);

      console.log({ dis });

      setDistricts(dis.districts);
    }
  }, [cities, valueCity]);

  const handleOnSelectedDistrict = (e) => {
    setValueDistrict(e.target.value);

    setValueWard("");
    setWards([]);
  };

  useEffect(() => {
    //console.log({ cities });
    if (valueDistrict) {
      const wards = districts.find(
        (district) => district.code === valueDistrict
      );

      //console.log({ wards });

      setWards(wards.wards);
    }
  }, [districts, valueDistrict]);

  const handleOnSelectedWard = (e) => {
    setValueWard(e.target.value);
  };

  console.log({ cities });
  return (
    <Container style={{ marginTop: 20 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <InputLabel>Họ tên</InputLabel>
          <TextField
            placeholder="Nhập họ tên"
            variant="outlined"
            size="medium"
            required
            fullWidth
            helperText="Họ tên không được bỏ trống!"
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <InputLabel>Ho ten</InputLabel>
          <Input placeholder="Nhap ho va ten"></Input>
        </Grid>
        <Grid item xs={12} sm={4}>
          <InputLabel>Ho ten</InputLabel>
          <Input placeholder="Nhap ho va ten"></Input>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <InputLabel htmlFor="select-city" shrink>
            Tinh/ Thanh pho
          </InputLabel>
          <NativeSelect
            fullWidth
            value={valueCity}
            onChange={handleOnSelectedCity}
            de
            inputProps={{
              id: "select-city",
              name: "city",
            }}
          >
            {cities.map((item) => {
              return (
                <option value={item.code} key={item.codename}>
                  {item.name}
                </option>
              );
            })}
          </NativeSelect>
        </Grid>
        <Grid item xs={12} sm={4}>
          <InputLabel htmlFor="select-district" shrink>
            Quan/ Huyen
          </InputLabel>
          <NativeSelect
            fullWidth
            value={valueDistrict}
            onChange={handleOnSelectedDistrict}
            inputProps={{
              id: "select-district",
              name: "district",
            }}
          >
            {districts.map((item) => {
              return (
                <option value={item.code} key={item.codename}>
                  {item.name}
                </option>
              );
            })}
          </NativeSelect>
        </Grid>
        <Grid item xs={12} sm={4}>
          <InputLabel htmlFor="select-ward" shrink>
            Phuong/ Xa
          </InputLabel>
          <NativeSelect
            fullWidth
            value={valueWard}
            onChange={handleOnSelectedWard}
            inputProps={{
              id: "select-ward",
              name: "ward",
            }}
          >
            {wards.map((item) => {
              return (
                <option value={item.code} key={item.codename}>
                  {item.name}
                </option>
              );
            })}
          </NativeSelect>
        </Grid>
      </Grid>
    </Container>
  );
}
