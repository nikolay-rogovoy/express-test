import {Sizedoc} from '../entity/sizedoc';
import {IResourceT} from './i-resource-t';

export interface IResources {
    sizedocs: Sizedoc[];
    resources: IResourceT[];
}
