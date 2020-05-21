export const setCurrentUser = user => ({
    type: 'SET_CURRENT_USER',
    payload: user
})

export const setAddress = address => ({
    type: 'SET_ADDRESS',
    payload: address
})


export const setMonth = month => ({
    type: 'SET_MONTH',
    payload: month
})

export const handle_change = (name, value) => ({
    type: 'HANDLE_CHANGE',
    payload: value,
    name: name
})

export const setImage = (imageName , imageObject) => ({
    type: 'SET_IMAGE',
    imageName: imageName,
    imageObject:imageObject,
})

export const setImageURL = (imageType,imageURL) => ({
    type:'SET_IMAGE_URL',
    imageType: imageType,
    imageURL: imageURL
})

export const set_state = ( stateName , value ) => ({
    type:'SET_STATE',
    stateName:stateName,
    value:value
})