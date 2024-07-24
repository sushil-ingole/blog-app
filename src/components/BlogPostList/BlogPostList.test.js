import React from 'react';
import { render, screen } from '@testing-library/react';
import BlogPostList from './BlogPostList';
import '@testing-library/jest-dom/extend-expect';
import fetchMock from 'jest-fetch-mock';
import {PostContext} from "../PostsContext";
import { MemoryRouter } from 'react-router-dom';

const mockPosts = [
    {
        source: {
            id: "wired",
            name: "Wired"
        },
        author: "Nadeem Sarwar, Shreya Fotedar",
        title: "This Ancient Technology Is Helping Millions Stay Cool",
        description: "Cheap, low-energy evaporative cooling devices are keeping water, food, people, and even whole buildings cool across India.",
        url: "https://www.wired.com/story/evaporative-cooling-devices-coolant-clay-matka-mitticool-india-heat-wave/",
        urlToImage: "https://media.wired.com/photos/6672c421e0704c563b4e7b77/191:100/w_1280,c_limit/GettyImages-80973767.jpg",
        publishedAt: "2024-07-09T15:42:42Z",
        content: "CBalance is another company working to tackle the heat problem, specifically for underprivileged households living in tightly packed slums, ghettos, and poorly planned neighborhoods. Led by Vivek Gil… [+3227 chars]"
    },
    {
        source: {
            id: null,
            name: "Yahoo Entertainment"
        },
        author: "Sarah Fielding",
        title: "Apple will allow developers access to its NFC technology, avoiding an EU fine",
        description: "After four years of back and forth, the European Union and Apple have finally come to an agreement on the latter's tap-and-go technology. The European Commission announced Apple made \"legally binding\" commitments to provide developers with their Near-Field Co…",
        url: "https://consent.yahoo.com/v2/collectConsent?sessionId=1_cc-session_5603150f-78f3-420d-a532-a7c962417caa",
        urlToImage: null,
        publishedAt: "2024-07-11T12:30:26Z",
        content: "If you click 'Accept all', we and our partners, including 237 who are part of the IAB Transparency &amp; Consent Framework, will also store and/or access information on a device (in other words, use … [+678 chars]"
    }
];

describe('BlogPostList', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    test('should return "No posts available" if allBlogPost and posts both are not present', () => {
        const contextValue = { allBlogPost: [], setAllBlogPost: jest.fn() };
        render(
            <PostContext.Provider value={contextValue}>
                <BlogPostList/>
            </PostContext.Provider>
        )
        const prevName = screen.getByText('Loading...');
        expect(prevName).toBeInTheDocument();
    });

    test('should render BlogPostItem components when posts are available', () => {
        const contextValue = { allBlogPost: mockPosts, setAllBlogPost: jest.fn() };
        render(
            <MemoryRouter>
                <PostContext.Provider value={contextValue}>
                    <BlogPostList />
                </PostContext.Provider>
            </MemoryRouter>
        );

        mockPosts.forEach(post => {
            expect(screen.getByText(post.title)).toBeInTheDocument();
            expect(screen.getByText(post.description)).toBeInTheDocument();
        });
    });
});
