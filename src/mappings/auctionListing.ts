import { zeroBigInt } from './helpers'
import { ListingBuilt } from '../../generated/templates/AuctionListing/AuctionListing'
import { Listing } from '../../generated/schema'

export function handleListingBuilt(event: ListingBuilt): void {
  let listing = Listing.load(event.params.listingAddress.toHexString())

  listing.canceled = false
  listing.groupable = event.params.groupable
  listing.hasSuppliers = false
  listing.winner = event.params.winner
  listing.ltMax = event.params.ltMax
  listing.creationTime = event.params.creationTime
  listing.auctionTime = event.params.auctionTime
  listing.endTime = event.params.endTime
  listing.revealTime = event.params.revealTime
  listing.minMerit = event.params.minMerit
  listing.maxPrice = event.params.maxPrice
  listing.highestBid = event.params.maxPrice
  listing.address = event.params.listingAddress
  listing.uri = event.params.productURI
  listing.quantityToFulfil = zeroBigInt()
  listing.fPBid = event.params.fPBid.toI32()

  listing.save()
}