import { StatusMessageDataValueV1 } from './StatusMessageDataValueV1';

export class StatusMessageV1 {
    public device_udi: string;
    public device_version?: number;
    public org_id?: string;
    public organization_version?: number;
    public time: Date;

    // Deprecated values
    public freezed?: boolean;
    public pressed?: boolean;
    public long_pressed?: boolean;

    public lat?: number;
    public lng?: number;
    public alt?: number;
    public angle?: number;
    public speed?: number;

    public params?: StatusMessageDataValueV1[];
    public events?: StatusMessageDataValueV1[];

    public beacons?: string[];
}