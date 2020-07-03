import React, { useEffect, useState, FunctionComponent } from "react";
import { UserAPI } from "../../../services/api/UserAPI";
import { IUser } from "../../../model/user/IUser";
import { IconButton } from "office-ui-fabric-react";
import { makeColumns } from "./helpers/makeColumns";
import { SelectionMode } from "office-ui-fabric-react/lib/DetailsList";
import { columnFormatter } from "./helpers/columnsFormatter";
import { ShimmeredDetailsList } from "office-ui-fabric-react/lib/ShimmeredDetailsList";
import { useTranslation } from "react-i18next";
import i18n from "../../../helpers/i18n";
import { renderRow } from "./helpers/rowFormatter";
import { history } from "../../../helpers/browserHistory";

interface IProps {

}

export const UserListPage: FunctionComponent<IProps> = () => {

    const [users, setUsers] = useState<IUser[]>([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    const { t } = useTranslation(['admin', 'error_handler', 'messages'], { i18n, useSuspense: false });

    const fetchData = () => {
        setIsDataLoaded(false);
        UserAPI.getUsers()
            .then((res) => {
                setUsers(res.items);
            console.log(res.items);
        })
            .catch((err) => {
                console.error(err.toString());
            })
            .finally(() => {
                setIsDataLoaded(true);
            })
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (<>
        <h2>{t('admin:page.title')}</h2>
        <IconButton
            className="add-new-btn"
            iconProps={{ iconName: "Add" }}
            onClick={() => history.push('users/new')}
        />
        <ShimmeredDetailsList items={users}
                              className="dark-fluent-table"
                              setKey="user-list-items"
                              columns={makeColumns(t)}
                              selectionMode={SelectionMode.none}
                              shimmerLines={10}
                              enableShimmer={!isDataLoaded}
                              onRenderRow={renderRow}
                              onRenderItemColumn={columnFormatter(fetchData)}
        />


    </>)
}
