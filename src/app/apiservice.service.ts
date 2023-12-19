import { Injectable } from '@angular/core';
import axios, { AxiosResponse, AxiosError } from 'axios'; // Import AxiosResponse dan AxiosError

@Injectable({
  providedIn: 'root',
})
export class ApiserviceService {
  public uriApi: string = 'https://greenland-foresthill.id/rest-api/index.php/';

  constructor() {}
  async getPenduduk() {
    try {
        let url = this.uriApi + 'penduduk';

        const res: AxiosResponse = await axios.get(url);
        
        let data = res.data.result;
        return {
            msg: 'ok',
            data: data,
        };
    } catch (err: any) {
        return {
            msg: 'err',
            err: err,
        };
    }
}
  async createPenduduk(data: any) {
    try {
      let url = this.uriApi + 'penduduk';

      const res = await axios.post(url, data);
      if (res.data.status == 'Ok') {
        return {
          msg: 'ok',
        };
      } else {
        return {
          msg: 'notOk',
        };
      }
    } catch (err: any) {
      console.log(err);
      return {
        msg: 'err',
        err: err,
      };
    }
  }
  async updatePenduduk(data: any) {
    try {
        let url = this.uriApi + 'index_post'; // Ensure this matches your server-side endpoint
        const res: AxiosResponse = await axios.post(url, {
            kd: data.kd,
            status_huni: data.status_huni,
        });
        if (res.data.status == 'Ok') {
            return {
                msg: 'ok',
            };
        } else {
            return {
                msg: 'notOk',
            };
        }
    } catch (err: any) {
        return {
            msg: 'err',
            err: err,
        };
    }
}



  async getInfo() {
    try {
      let url = this.uriApi + 'info';
      const res: AxiosResponse = await axios.get(url); // Tentukan tipe AxiosResponse
      let data = res.data.result;
      return {
        msg: 'ok',
        data: data,
      };
    } catch (err: any) {
      console.log(err);
      if (axios.isAxiosError(err) && err.response && err.response.data && err.response.data.status == 'Err') {
        return {
          msg: 'notFound',
        };
      } else {
        return {
          msg: 'err',
          err: err,
        };
      }
    }
  }
  async createInfo(data: any) {
    try {
      let url = this.uriApi + 'info';

      const res = await axios.post(url, data);

      if (res.data.status == 'Ok') {
        return {
          msg: 'ok',
        };
      } else {
        return {
          msg: 'notOk',
        }; 
      }
    } catch (err: any) {
      console.log(err);
      return {
        msg: 'err',
        err: err,
      };
    }
  }
  async updateInfo(data: any, kd: string) {
    try {
        let url = this.uriApi + 'update_info';
        const res: AxiosResponse = await axios.post(url, {
            kd: kd,
            judul_info: data.judul_info,
            informasi: data.informasi,
            tgl_info: data.tgl_info,
        });

        if (res.data.status === 'Ok') {
            return {
                msg: 'ok',
            };
        } else {
            return {
                msg: 'notOk',
            };
        }
    } catch (err: any) {
        return {
            msg: 'err',
            err: err,
        };
    }
}
  async deleteInfo(kd: string) {
    try {
        let url = this.uriApi + 'delete_info';
        const res: AxiosResponse = await axios.post(url, {
            kd: kd,
        });
  
        if (res.data.status === 'Ok') {
            return {
                msg: 'ok',
            };
        } else {
            return {
                msg: 'notOk',
            };
        }
    } catch (err: any) {
        return {
            msg: 'err',
            err: err,
        };
    }
  }



async getBlok() {
  try {
      let url = this.uriApi + 'blok_kavling';
      // if (kd) {
      //     url += `?kd=${kd}`;
      // }

      const res: AxiosResponse = await axios.get(url);

      let data = res.data.result;
      return {
          msg: 'ok',
          data: data,
      };
  } catch (err: any) {
      return {
          msg: 'err',
          err: err,
      };
  }
}
async updateBlok(data: any, kd: string) {
  try {
      let url = this.uriApi + 'update_blok';
      const res: AxiosResponse = await axios.post(url, {
          kd: kd,
          nama_blok: data.nama_blok,
          no_blok: data.no_blok,
      });

      if (res.data.status === 'Ok') {
          return {
              msg: 'ok',
          };
      } else {
          return {
              msg: 'notOk',
          };
      }
  } catch (err: any) {
      return {
          msg: 'err',
          err: err,
      };
  }
}

async deleteBlok(kd: string) {
  try {
      let url = this.uriApi + 'delete_blok';
      const res: AxiosResponse = await axios.post(url, {
          kd: kd,
      });

      if (res.data.status === 'Ok') {
          return {
              msg: 'ok',
          };
      } else {
          return {
              msg: 'notOk',
          };
      }
  } catch (err: any) {
      return {
          msg: 'err',
          err: err,
      };
  }
}
async getIuran() {
  try {
      let url = this.uriApi + 'iuran';

      // // Build query parameters based on provided values
      // const queryParams: string[] = [];
      // if (kd) queryParams.push(`kd=${kd}`);
      // if (tahun) queryParams.push(`thn=${tahun}`);
      // if (bulan) queryParams.push(`bln=${bulan}`);
      // if (jenis) queryParams.push(`jenis=${jenis}`);

      // // Append query parameters to the URL
      // if (queryParams.length > 0) {
      //     url += '?' + queryParams.join('&');
      // }

      const res: AxiosResponse = await axios.get(url);

      let data = res.data.result;
      return {
          msg: 'ok',
          data: data,
      };
  } catch (err: any) {
      return {
          msg: 'err',
          err: err,
      };
  }
}
async updateIuran(data: any, kd: string) {
  try {
      let url = this.uriApi + 'update_iuran';
      const res: AxiosResponse = await axios.post(url, {
          kd: kd,
          status: data.status,
      });

      if (res.data.status === 'Ok') {
          return {
              msg: 'ok',
          };
      } else {
          return {
              msg: 'notOk',
          };
      }
  } catch (err: any) {
      return {
          msg: 'err',
          err: err,
      };
  }
}

async getPesan() {
  try {
      let url = this.uriApi + 'get_pesan';

      const res: AxiosResponse = await axios.get(url);

      let data = res.data.result;
      return {
          msg: 'ok',
          data: data,
      };
  } catch (err: any) {
      return {
          msg: 'err',
          err: err,
      };
  }
}
}

