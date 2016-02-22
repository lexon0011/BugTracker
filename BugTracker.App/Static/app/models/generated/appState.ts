import * as Immutable from 'immutable';
import * as ModelMeta from '../../utils/model/meta';
import * as Models from '../models';

export interface IReducerAppState {
    users: (state: any, action: any) => any;
    issues: (state: any, action: any) => any;
    currentUser: (state: any, action: any) => any;
}

export class AppState {
    @ModelMeta.ImplementsModels(Immutable.List, () => Models.UserModel) public users: Immutable.List<Models.UserModel> = null;
    @ModelMeta.ImplementsModels(Immutable.List, () => Models.IssueModel) public issues: Immutable.List<Models.IssueModel> = null;
    @ModelMeta.ImplementsModel(() => Models.CurrentUserState) public currentUser: Models.CurrentUserState = null;
}