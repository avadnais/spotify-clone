export const initialState = {
    user: null,
    playlists: [],
    discover_weekly: null,
    token: null,
    spotify: null,
    loading: true,
    index: null
}

// LISTENER
const reducer = (state, action) => {
    console.log(action);

    //Action -> type, [payload]

    switch(action.type) {
        case 'SET_USER': 
            return {
                ...state, 
                user: action.user,
            }
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.token
            }
        case 'SET_PLAYLISTS':
            return {
                ...state,
                playlists: action.playlists
            }
        case 'SET_SELECTED_PLAYLIST':
            return {
                ...state,
                selected_playlist: action.selected_playlist
            }
        case 'SET_DISCOVER_WEEKLY':
            return {
                ...state,
                discover_weekly: action.discover_weekly
            }
        case 'SET_SELECTED_TRACK':
            return {
                ...state,
                track: action.track
            }
        case 'SET_PLAYING':
            return {
                ...state,
                playing: action.playing,
            }
        case 'SET_VOLUME':
            return {
                ...state,
                volume: action.volume
            }
        case 'SET_PLAY_CONTEXT':
            return {
                ...state,
                play_context: action.play_context
            }
        case 'SET_INDEX':
            return {
                ...state,
                index: action.index
            }
        default: 
            return state;
    }

}

export default reducer;