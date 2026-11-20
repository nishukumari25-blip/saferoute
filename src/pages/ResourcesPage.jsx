import React, { useState } from 'react';
import {
  PhoneCall,
  Shield,
  BookOpen,
  Search,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Globe,
  Heart,
  FileText,
} from 'lucide-react';
import Card, { CardHeader } from '../components/common/Card';
import Badge from '../components/common/Badge';
import { VERIFIED_HELPLINES, SAFETY_GUIDES } from '../utils/constants';
import { sanitizePhoneForTel } from '../utils/formatters';

export const ResourcesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedGuide, setExpandedGuide] = useState('guide_transit');

  const categories = ['All', 'Universal Emergency', 'Women Protection', 'Support & Counseling', 'Cyber Safety', 'International'];

  const filteredHelplines = VERIFIED_HELPLINES.filter((h) => {
    const matchesCategory = selectedCategory === 'All' || h.category === selectedCategory;
    const matchesSearch =
      h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.number.includes(searchQuery) ||
      h.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.85rem', fontWeight: 800, marginBottom: '0.25rem' }}>
          Verified Helplines & Safety Resources
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
          Official 24x7 emergency phone numbers and practical safety guidance. Click any number to call.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.75rem',
        }}
      >
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`btn btn-sm ${selectedCategory === cat ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div style={{ position: 'relative', width: '280px' }}>
          <Search
            size={16}
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--color-text-light)',
            }}
          />
          <input
            type="text"
            className="form-control"
            style={{ paddingLeft: '2.4rem', fontSize: '0.88rem' }}
            placeholder="Search helpline or service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Helplines Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem',
        }}
      >
        {filteredHelplines.map((item) => (
          <Card key={item.id} className="card-hover">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
              <div>
                <span className="badge badge-secondary" style={{ marginBottom: '0.4rem' }}>
                  {item.category}
                </span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>{item.name}</h3>
              </div>
              <Badge variant="primary">{item.badge}</Badge>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
              {item.description}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid var(--color-surface-alt)' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)' }}>Direct Phone</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                  {item.number}
                </div>
              </div>

              <a
                href={`tel:${sanitizePhoneForTel(item.number)}`}
                className="btn btn-primary btn-sm"
                style={{ textDecoration: 'none', padding: '0.5rem 1.25rem' }}
              >
                <PhoneCall size={16} />
                <span>Call {item.number}</span>
              </a>
            </div>
          </Card>
        ))}
      </div>

      {/* Practical Safety Guides Accordion */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <BookOpen size={22} color="var(--color-primary)" />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Essential Safety Playbooks & Legal Rights</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {SAFETY_GUIDES.map((guide) => {
            const isExpanded = expandedGuide === guide.id;
            return (
              <Card key={guide.id} style={{ padding: '0' }}>
                <div
                  onClick={() => setExpandedGuide(isExpanded ? null : guide.id)}
                  style={{
                    padding: '1.25rem 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    userSelect: 'none',
                  }}
                >
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-main)' }}>
                      {guide.title}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '0.2rem' }}>
                      {guide.summary}
                    </p>
                  </div>
                  <div style={{ color: 'var(--color-text-muted)' }}>
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>

                {isExpanded && (
                  <div
                    style={{
                      padding: '0 1.5rem 1.5rem',
                      borderTop: '1px solid var(--color-surface-alt)',
                      paddingTop: '1rem',
                      backgroundColor: 'var(--color-surface-alt)',
                    }}
                  >
                    <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                      {guide.points.map((pt, idx) => (
                        <li key={idx} style={{ fontSize: '0.9rem', color: 'var(--color-text-main)', lineHeight: 1.5 }}>
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;
