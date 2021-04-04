import Dexie from 'dexie'
import { StringLiteralLike } from 'typescript';

export interface MemoRecord {
    datetime: string,
    title: string,
    text: string
}

// インスタンスを生成、データベース名markdown-editor
const database = new Dexie('markdown-editor')
database.version(1).stores({memos:'&datetime'})
const memos: Dexie.Table<MemoRecord, string> = database.table('memos')

// テーブルの保存
export const putMemo = async (title: string,text: string): Promise<void> => {
    const datetime = new Date().toISOString()
    await memos.put({datetime,title,text})
}