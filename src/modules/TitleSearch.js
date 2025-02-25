import React, { useState, useEffect, useCallback } from 'react'
import { debounce } from 'lodash'
import userStory from '../services/user_story'
import { strip } from '../utils/filterText'
import { EOS_ARROW_FORWARD, EOS_THUMB_UP } from 'eos-icons-react'

const Search = (props) => {
  const { title } = props

  const [searchResults, setSearchResults] = useState([])

  const handleTitleChange = useCallback(
    debounce(async (title) => {
      const response = await userStory.getStoriesByTitle(title)
      setSearchResults(response.data.data.userStories)
    }, 600),
    []
  )

  useEffect(() => {
    if (!title) {
      return
    }
    handleTitleChange(title)
  }, [title, handleTitleChange])

  if (!title) {
    return ''
  }
  return (
    <div className='flex flex-column title-search'>
      <h4>
        <EOS_ARROW_FORWARD className='eos-icons' />
        {searchResults.length > 0
          ? ' We found some matching results'
          : ' No matching stories found. Go ahead and create one.'}
      </h4>
      {searchResults.map((result, key) => {
        return (
          <div
            className='story title-search-results'
            onClick={() => window.open(`/story/${result.id}`, '_blank')}
            key={key}
          >
            <div className='stories-content title-search-result'>
              <h4>{strip(result.Title, 80)}</h4>
            </div>
            <div className='icon-display'>
              {result.followers.length}
              <EOS_THUMB_UP className='eos-icons' />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Search
