import { Currency } from '../Currency'
import { NativeCurrency } from '../NativeCurrency'
import { Token } from '../Token'
import { WNATIVE } from '../../constants/tokens'
import invariant from 'tiny-invariant'

export class Aurora extends NativeCurrency {
  protected constructor(chainId: number) {
    super(chainId, 18, 'AURORA', 'Aurora')
  }

  public get wrapped(): Token {
    const wnative = WNATIVE[this.chainId]
    invariant(!!wnative, 'WRAPPED')
    return wnative
  }

  private static _cache: { [chainId: number]: Aurora } = {}

  public static onChain(chainId: number): Aurora {
    return this._cache[chainId] ?? (this._cache[chainId] = new Aurora(chainId))
  }

  public equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId
  }
}
