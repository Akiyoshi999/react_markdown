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

// ページ総数の取得
const NUM_PER_PAGE: number = 10

export const getMemoPageCount = async (): Promise<number> =>{
    const totalCount = await memos.count()
    const pageCount = Math.ceil(totalCount /NUM_PER_PAGE)
    return pageCount > 0 ? pageCount: 1
}

// テキスト履歴を取得 <MemoRecord[]>の[]は配列型を返却するため
export const  getMemos = (page:number): Promise<MemoRecord[]> =>{
    const offset = (page -1) * NUM_PER_PAGE
    return memos.orderBy('datetime')
    .reverse()
    .offset(offset)
    .limit(NUM_PER_PAGE)
    .toArray()
}