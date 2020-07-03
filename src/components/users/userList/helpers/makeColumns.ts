import { TFunction } from "i18next";

/**
 * Returns translated columns for the source table
 * @param t - translator function
 */

export const makeColumns = (t: TFunction) => [
    {
        key: 'user-id',
        name: t('admin:entity.id'),
        minWidth: 30,
        maxWidth: 30,
        fieldName: 'id',
        isRowHeader: true,
        isResizable: true,
        data: 'string',
    },
    {
        key: 'user-login',
        name: t('admin:entity.login'),
        minWidth: 160,
        fieldName: 'login',
        isRowHeader: true,
        isResizable: true,
        data: 'string',
    },
    {
        key: 'user-email',
        name: t('admin:entity.email'),
        minWidth: 160,
        fieldName: 'email',
        isRowHeader: true,
        isResizable: true,
        data: 'string',
    },
    {
        key: 'user-creationDate',
        name: t('admin:entity.creationDate'),
        minWidth: 200,
        fieldName: 'creationDate',
        isRowHeader: true,
        isResizable: true,
        data: 'string',
    },
    {
        key: 'user-updatedOn',
        name: t('admin:entity.updatedOn'),
        minWidth: 200,
        fieldName: 'updatedOn',
        isRowHeader: true,
        isResizable: true,
        data: 'string',
    },
    {
        key: 'user-actions',
        name: t('admin:table.actions'),
        minWidth: 160,
        fieldName: 'id',
        isRowHeader: true,
        isResizable: true,
        data: 'string',
    },
]