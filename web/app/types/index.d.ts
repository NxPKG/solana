import { CSSProperties } from "react"
import { Root } from "react-dom/client"
import { createStore } from "jotai"
import { Wallet } from "@jup-ag/wallet-adapter"
import { Connection, PublicKey, TransactionError } from "@solana/web3.js"
import { QuoteResponseMeta, SwapResult } from "@jup-ag/react-hook"
import { WalletContextState } from "@jup-ag/wallet-adapter"
import EventEmitter from "events"
import { PlatformFeeAndAccounts } from "@jup-ag/common"
import { SwapMode } from "./enums"

export interface IInit {
  /** Solana RPC, declare either endpoint, or Connection object */
  /** Solana RPC endpoint */
  endpoint?: string
  /** Solana RPC Connection object */
  connectionObj?: Connection

  /** TODO: Update to use the new platform fee and accounts */
  platformFeeAndAccounts?: PlatformFeeAndAccounts
  /** Configure Terminal's behaviour and allowed actions for your user */
  formProps?: FormProps
  /** Only allow strict token by [Jupiter Token List API](https://station.jup.ag/docs/token-list/token-list-api) */
  strictTokenList?: boolean
  /** Default explorer for your user */
  defaultExplorer?: DEFAULT_EXPLORER
  /** Auto connect to wallet on subsequent visits */
  autoConnect?: boolean
  /** Use user's slippage instead of initialSlippageBps, defaults to true */
  useUserSlippage?: boolean
  /** TODO: NOT Supported yet, presets of slippages, defaults to [0.1, 0.5, 1.0] */
  slippagePresets?: number[]
  /** RPC refetch interval for getTABO in milliseconds, defaults to 10000 */
  refetchIntervalForTokenAccounts?: number

  /** Display & Styling */

  /** Display mode */
  displayMode?: "modal" | "integrated" | "widget"
  /** When displayMode is 'integrated', this is the id of the element to render the integrated widget into */
  integratedTargetId?: string
  /** When displayMode is 'widget', this is the behaviour and style of the widget */
  widgetStyle?: {
    position?: WidgetPosition
    size?: WidgetSize
  }
  /** In case additional styling is needed for Terminal container */
  containerStyles?: CSSProperties
  /** In case additional styling is needed for Terminal container */
  containerClassName?: string

  /** When true, wallet connection are handled by your dApp, and use `syncProps()` to syncronise wallet state with Terminal */
  enableWalletPassthrough?: boolean
  /** Optional, if wallet state is ready, you can pass it in here, or just use `syncProps()` */
  passthroughWalletContextState?: WalletContextState
  /** When enableWalletPassthrough is true, this allows Terminal to callback your dApp's wallet connection flow */
  onRequestConnectWallet?: () => void | Promise<void>

  /** Callbacks */
  /** When an error has occured during swap */
  onSwapError?: ({
    error,
    quoteResponseMeta,
  }: {
    error?: TransactionError
    quoteResponseMeta: QuoteResponseMeta | null
  }) => void
  /** When a swap has been successful */
  onSuccess?: ({
    txid,
    swapResult,
    quoteResponseMeta,
  }: {
    txid: string
    swapResult: SwapResult
    quoteResponseMeta: QuoteResponseMeta | null
  }) => void
  /** Callback when there's changes to the form */
  onFormUpdate?: (form: IForm) => void
  /** Callback when there's changes to the screen */
  onScreenUpdate?: (screen: IScreen) => void

  /** Ask jupiter to quote with a maximum number of accounts, essential for composing with Jupiter Swap instruction */
  maxAccounts?: number
  /** Request Ix instead of direct swap */
  onRequestIxCallback?: (ixAndCb: IOnRequestIxCallback) => Promise<void>

  /** Internal resolves */

  /** Internal use to resolve domain when loading script */
  scriptDomain?: string
}
