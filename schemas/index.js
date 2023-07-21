module.exports = `#graphql
  type Song {
    user_id: ID!
    id: String!
    audio: String!
    keywords: [String]!
    category: String!
    videoChannelId: String!
    videoTitle: String!
    videoURL: String!
    thumbnail: String!
    createdAt: String!
    updatedAt: String!
  }

  type Channel {
    videoChannelId: String!
    videoChannelThumbnail: String!
    videoChannel: String!
    createdAt: String!
    updatedAt: String!
  }

  type Playlist {
    user_id: ID!
    id: ID!
    title: String!
    thumbnail: String!
    songs: [String]!
  }

  type Query {
    allSongs: [Song!]!
    allChannels: [Channel!]!
    allPlaylistsByUser: [Playlist]!
    getSong(songId: String!): Song
    getSongByChannel(channelId: String!): [Song!]!
    getPlaylist(playlistId: ID!): Playlist!
    getSongByPlaylist(playlistId: ID!): [Song!]!
    getSongByUser: [Song!]!
  }
`;
