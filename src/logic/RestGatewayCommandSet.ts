import { CommandSet } from 'pip-services3-commons-node';
import { ICommand } from 'pip-services3-commons-node';
import { Command } from 'pip-services3-commons-node';
import { Schema } from 'pip-services3-commons-node';
import { Parameters } from 'pip-services3-commons-node';
import { ObjectSchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';

import { StatusMessageV1 } from '../data/version1/StatusMessageV1';
import { StatusMessageV1Schema } from '../data/version1/StatusMessageV1Schema';
import { IRestGatewayController } from './IRestGatewayController';

export class RestGatewayCommandSet extends CommandSet {
    private _logic: IRestGatewayController;

    constructor(logic: IRestGatewayController) {
        super();

        this._logic = logic;

        // Register commands to the controller
		this.addCommand(this.makeUpdateStatusCommand());
    }

	private makeUpdateStatusCommand(): ICommand {
		return new Command(
			"update_status",
			new ObjectSchema(true)
				.withRequiredProperty('message', new StatusMessageV1Schema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let message: StatusMessageV1 = args.get("message");
                this._logic.updateStatus(message, (err) => {
                    callback(err, null);
                });
            }
		);
	}

}