import React from "react";
import { StorageService } from "../../../../services/StorageService";
import { IconButton } from 'office-ui-fabric-react';
import { DirectionalHint } from "@fluentui/react";
import { UserAPI } from "../../../../services/api/UserAPI";

const removeUser = (id: number, callback: () => void) => {
    UserAPI.deleteUser(id)
        .then(() => {})
        .catch(() => {})
        .finally(() => {
            callback();
        })
}

export const columnFormatter = (fetchData: () => void) => {
    return (item: any, index: any, column: any) => {
        const fieldContent = item[column.fieldName as string];

        switch (column.key) {
            case 'user-creationDate':
            case 'user-updatedOn':
                const date = new Date(fieldContent);
                const formattedDate = new Intl.DateTimeFormat(StorageService.getCurrentLanguage(), { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(date);
                return <span>{formattedDate}</span>
            case 'user-actions':
                return <>
                
                <IconButton
                        className=""
                        menuIconProps={{ iconName: "PasswordField" }}
                    />
                    <IconButton
                        className=""
                        iconProps={{ iconName: "Edit" }}
                    />
                    <IconButton
                        className=""
                        menuIconProps={{ iconName: "Delete" }}

                        menuProps={{
                            directionalHint: DirectionalHint.leftCenter,
                            items: [{ key: 'confirm-del', iconProps: {iconName: 'CheckMark'}, onClick: () => {removeUser(item.id, fetchData)}}],
                        }}
                    />
                    </>
            default:
                return <span>{fieldContent}</span>;
        }

    };
};