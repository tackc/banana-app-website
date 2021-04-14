import React from 'react'
import { graphql } from 'gatsby'

export default function Template({
  data
}) {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  return (
    <div className="section-container">
      <div className="section">
        <h1>{frontmatter.title}</h1>
        <div 
          className="section-content" 
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  )
}

export const pageQueury = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontMatter {
        slug
        title
      }
    }
  }
`