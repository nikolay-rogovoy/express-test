import {Sizedoc} from '../entity/sizedoc';
import {Sizedocstagevalue} from '../entity/sizedocstagevalue';

export interface IResourceTask {
    sizedoc: Sizedoc;
    sizedocstagevalues: Sizedocstagevalue[];
}
