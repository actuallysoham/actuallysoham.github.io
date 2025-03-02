---
layout: post
title: "Understanding X's Community Notes"
description: "A technical deep-dive into how Community Notes works to identify helpful context on social media posts"
---

## What are Community Notes?

Community Notes (formerly known as Birdwatch) is X's crowd-sourced fact-checking system that allows contributors to add helpful context to potentially misleading posts. The system uses a novel bridging-based ranking algorithm to identify notes that people from different perspectives find helpful.

## How does it work?

At a high level, Community Notes works in three main steps:

1. **Note Writing**: Contributors write notes providing context on posts they believe could be misleading
2. **Note Rating**: Other contributors rate these notes on helpfulness
3. **Algorithmic Ranking**: An algorithm identifies which notes are helpful to people across different viewpoints

### The Bridging-Based Algorithm

The core innovation in Community Notes is its bridging-based ranking algorithm. Here's how it works:

#### 1. Creating the Rating Network

First, the system creates a network based on how contributors rate notes:
- Each contributor is a node in the network
- Edges are created between contributors who tend to agree in their note ratings
- The strength of edges depends on rating similarity

#### 2. Identifying Perspectives

The algorithm then:
- Uses network clustering to identify groups of contributors with similar rating patterns
- These groups often correspond to different perspectives or viewpoints on issues
- The goal is to find notes that bridge across these different groups

#### 3. Scoring Notes

A note's final status depends on:
- Getting high helpfulness ratings overall
- Crucially, getting high ratings from contributors across different clusters
- Meeting certain rating thresholds within a time window

```python
# Simplified pseudocode for note scoring
def score_note(note, ratings, contributor_clusters):
    scores_by_cluster = {}
    
    for cluster in contributor_clusters:
        cluster_ratings = [r for r in ratings if r.rater in cluster]
        scores_by_cluster[cluster] = mean(cluster_ratings)
    
    # Note needs high scores across clusters
    bridging_score = min(scores_by_cluster.values())
    return bridging_score
```

## Why is this approach effective?

The bridging-based approach has several key advantages:

1. **Reduces Polarization**: By requiring agreement across perspectives, it helps surface notes that are broadly credible rather than just popular within one group

2. **Resists Gaming**: Makes it harder for coordinated groups to manipulate the system since they need broad consensus

3. **Promotes Better Notes**: Incentivizes contributors to write notes that are factual and neutrally worded to appeal across perspectives

## Current Challenges & Future Work

While Community Notes has shown promise, some open challenges include:

- Scaling to more languages and regions
- Handling rapidly evolving situations
- Balancing speed vs accuracy
- Preventing harassment of contributors

## Learn More

For a deeper technical dive, check out:
- [The Community Notes Guide](https://twitter.github.io/communitynotes/)
- Our recent [paper on Supernotes](https://arxiv.org/pdf/2411.06116)
- X's [official documentation](https://help.twitter.com/en/using-x/community-notes)

_Last updated: March 14, 2024_ 