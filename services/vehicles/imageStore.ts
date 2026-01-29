let auctionImageUris: string[] = [];

export const setAuctionImageUris = (uris: string[]) => {
  auctionImageUris = uris;
};

export const getAuctionImageUris = () => auctionImageUris;

export const clearAuctionImageUris = () => {
  auctionImageUris = [];
};
