import Bluebird from 'bluebird';
import Fs from 'fs';
import Qs from 'query-string';
import request from 'request';
import Urllib from 'urllib';
import Xml2json from 'xml2json';
import { CameraServer } from '../../includes/constants/servers';
const { createWriteStream } = Bluebird.promisifyAll(Fs);
type XMlResponse = { data: any; status: number };
class AxisClient {
  server_name: string;
  username: string;
  password: string;
  url: string;

  constructor({ server_name, username, password, url }: CameraServer) {
    this.server_name = server_name;
    this.username = username;
    this.url = url;
    this.password = password;
  }

  formatXmlResponse = (res: { data: string; status: number }): XMlResponse => {
    const { data: _data, status } = res;
    const xml_string = _data.toString();
    return { data: Xml2json.toJson(xml_string, { object: true }), status };
  };

  getSchemaVersions = (): Promise<XMlResponse> => {
    const endpoint = `http://${this.url}/axis-cgi/disks/networkshare/schemaversions.cgi`;
    return Urllib.request(endpoint, {
      digestAuth : `${this.username}:${this.password}`,
      timeout    : 15000,
    }).then(this.formatXmlResponse);
  };

  getExportRecordInfo = (): Promise<XMlResponse> => {
    const endpoint = `http://${this.url}/axis-cgi/record/list.cgi?`;
    const query_string = Qs.stringify({ recordingid: 'all' });
    return Urllib.request(endpoint + query_string, {
      digestAuth : `${this.username}:${this.password}`,
      timeout    : 15000,
    }).then(this.formatXmlResponse);
  };

  getExportProperties = ({
    schema_version,
    disk_id,
    recording_id,
    start_time,
    stop_time,
  }: {
    schema_version: string;
    disk_id: string;
    recording_id: string;
    start_time: string;
    stop_time: string;
  }): Promise<XMlResponse> => {
    const endpoint = `http://${this.url}/axis-cgi/record/export/properties.cgi?`;
    const query_string = Qs.stringify({
      schemaversion : schema_version,
      diskid        : disk_id,
      recordingid   : recording_id,
      starttime     : start_time,
      stoptime      : stop_time,
    });
    return Urllib.request(endpoint + query_string, {
      digestAuth : `${this.username}:${this.password}`,
      timeout    : 15000,
    }).then(this.formatXmlResponse);
  };

  getRecording = ({
    start_time,
    stop_time,
    recording_id,
    disk_id,
    schema_version,
    export_format,
    file_path,
  }: {
    schema_version: number;
    disk_id: string;
    recording_id: string;
    start_time: string;
    stop_time: string;
    export_format: string;
    file_path: string;
  }): Promise<XMlResponse> => {
    const endpoint = `http://${this.url}/axis-cgi/record/export/exportrecording.cgi?`;
    const query_string = Qs.stringify({
      starttime     : start_time,
      stoptime      : stop_time,
      diskid        : disk_id,
      recordingid   : recording_id,
      exportformat  : export_format,
      schemaversion : schema_version,
    });

    const write_stream = createWriteStream(file_path);
    return new Bluebird((resolve, reject) => {
      write_stream.on('close', resolve);
      write_stream.on('error', reject);
      request(endpoint + query_string, {
        auth : {
          user            : this.username,
          pass            : this.password,
          sendImmediately : false,
        },
      }).pipe(write_stream);
    });
  };
}

export default AxisClient;
