import {
  UserAdded,
  UserRemoved,
  NewClient,
  LeftListing,
} from '../../generated/ListingInteraction/ListingInteraction'
import { Listing, Buyer, User } from '../../generated/schema'
import { zeroBigInt, oneBigInt, twoBigInt, threeBigInt } from './helpers'

export function handleUserAdded(event: UserAdded): void {
  let user = new User(event.params.account.toHexString())

  user.role = event.params.role
  user.active = true

  user.save()
}

export function handleUserRemoved(event: UserRemoved): void {
  let user = User.load(event.params.account.toHexString())

  user.active = false
  user.save()
}

export function handleNewClient(event: NewClient): void {
  let buyer = new Buyer(
    event.params.client.toHexString() + '-' + event.params.listingAddress.toHexString(),
  )

  buyer.weiAmount = event.params.depositedWei
  buyer.quantity = event.params.quantity
  buyer.canWithdraw = false
  buyer.isParticipating = true
  buyer.listing = event.params.listingAddress.toHexString()
  buyer.user = event.params.client.toHexString()

  buyer.save()
}

export function handleLeftListing(event: LeftListing): void {
  let buyer = Buyer.load(
    event.params.client.toHexString() + '-' + event.params.listingAddress.toHexString(),
  )
  let listing = Listing.load(event.params.listingAddress.toHexString())

  buyer.weiAmount = zeroBigInt()
  buyer.quantity = zeroBigInt()
  buyer.isParticipating = false

  buyer.save()

  let buyers = listing.buyers

  let index = buyers.indexOf(buyer.id)

  if (index > -1) {
    buyers.splice(index, 1)
  }

  listing.buyers = buyers

  listing.save()
}