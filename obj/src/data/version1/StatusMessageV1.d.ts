import { StatusMessageDataValueV1 } from './StatusMessageDataValueV1';
export declare class StatusMessageV1 {
    device_udi: string;
    device_version?: number;
    org_id?: string;
    organization_version?: number;
    time: Date;
    freezed?: boolean;
    pressed?: boolean;
    long_pressed?: boolean;
    lat?: number;
    lng?: number;
    alt?: number;
    angle?: number;
    speed?: number;
    params?: StatusMessageDataValueV1[];
    events?: StatusMessageDataValueV1[];
    beacons?: string[];
}
