import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, Eye, ArrowLeft, Image, Link, Bold, Italic, List, Quote, Code } from 'lucide-react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import Textarea from '../../components/UI/Textarea';
import { mockPages } from '../../data/mockData';

const ContentEditor: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  
  const [content, setContent] = useState({
    id: '',
    title: '',
    slug: '',
    content: '',
    status: 'draft' as 'draft' | 'published' | 'review',
    section: '',
    metaDescription: '',
    metaKeywords: '',
    featuredImage: '',
    publishDate: '',
    author: 'Admin'
  });

  useEffect(() => {
    if (id && id !== 'new') {
      // Charger le contenu existant
      const existingContent = mockPages.find(p => p.id === id);
      if (existingContent) {
        setContent({
          ...existingContent,
          metaDescription: '',
          metaKeywords: '',
          featuredImage: '',
          publishDate: existingContent.lastModified.toISOString().split('T')[0]
        });
      }
    }
  }, [id]);

  const sections = [
    'Institution',
    'Formation',
    'Recherche',
    'Admission',
    'Vie Étudiante',
    'International',
    'Actualités',
    'Contact'
  ];

  const handleSave = async (status: 'draft' | 'published' | 'review') => {
    setIsLoading(true);
    try {
      // Simuler la sauvegarde
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedContent = {
        ...content,
        status,
        lastModified: new Date()
      };
      
      console.log('Contenu sauvegardé:', updatedContent);
      
      // Rediriger vers la liste
      navigate('/admin/cms');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const insertTextAtCursor = (textToInsert: string) => {
    const textarea = document.getElementById('content-editor') as HTMLTextAreaElement;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = content.content;
      const before = text.substring(0, start);
      const after = text.substring(end, text.length);
      
      setContent(prev => ({
        ...prev,
        content: before + textToInsert + after
      }));
      
      // Repositionner le curseur
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + textToInsert.length, start + textToInsert.length);
      }, 0);
    }
  };

  const formatButtons = [
    { icon: Bold, label: 'Gras', action: () => insertTextAtCursor('**texte en gras**') },
    { icon: Italic, label: 'Italique', action: () => insertTextAtCursor('*texte en italique*') },
    { icon: List, label: 'Liste', action: () => insertTextAtCursor('\n- Élément de liste\n- Autre élément\n') },
    { icon: Quote, label: 'Citation', action: () => insertTextAtCursor('\n> Citation\n') },
    { icon: Link, label: 'Lien', action: () => insertTextAtCursor('[texte du lien](https://exemple.com)') },
    { icon: Image, label: 'Image', action: () => insertTextAtCursor('![alt text](url-de-l-image)') },
    { icon: Code, label: 'Code', action: () => insertTextAtCursor('`code`') },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/admin/cms')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft size={20} />
              <span>Retour</span>
            </Button>
            <div className="h-6 w-px bg-neutral-300"></div>
            <h1 className="text-3xl font-bold text-neutral-900">
              {id === 'new' ? 'Nouveau Contenu' : 'Modifier le Contenu'}
            </h1>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant={previewMode ? 'primary' : 'ghost'}
                onClick={() => setPreviewMode(!previewMode)}
                className="flex items-center space-x-2"
              >
                <Eye size={20} />
                <span>{previewMode ? 'Mode Édition' : 'Aperçu'}</span>
              </Button>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                onClick={() => handleSave('draft')}
                isLoading={isLoading}
              >
                Sauvegarder comme brouillon
              </Button>
              <Button
                variant="secondary"
                onClick={() => handleSave('review')}
                isLoading={isLoading}
              >
                Envoyer en révision
              </Button>
              <Button
                onClick={() => handleSave('published')}
                isLoading={isLoading}
                className="flex items-center space-x-2"
              >
                <Save size={20} />
                <span>Publier</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Éditeur Principal */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <div className="space-y-6">
                <Input
                  label="Titre"
                  value={content.title}
                  onChange={(e) => setContent(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Titre de la page..."
                  required
                />
                
                <Input
                  label="Slug URL"
                  value={content.slug}
                  onChange={(e) => setContent(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="url-de-la-page"
                  required
                />

                {!previewMode ? (
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Contenu
                    </label>
                    
                    {/* Barre d'outils de formatage */}
                    <div className="border border-neutral-300 rounded-t-lg bg-neutral-50 p-3">
                      <div className="flex flex-wrap gap-2">
                        {formatButtons.map((button, index) => {
                          const Icon = button.icon;
                          return (
                            <button
                              key={index}
                              type="button"
                              onClick={button.action}
                              className="p-2 hover:bg-neutral-200 rounded transition-colors duration-200"
                              title={button.label}
                            >
                              <Icon size={16} className="text-neutral-600" />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    
                    <textarea
                      id="content-editor"
                      value={content.content}
                      onChange={(e) => setContent(prev => ({ ...prev, content: e.target.value }))}
                      placeholder="Rédigez votre contenu ici... Vous pouvez utiliser Markdown."
                      className="w-full h-96 px-4 py-3 border border-neutral-300 border-t-0 rounded-b-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none font-mono text-sm"
                      required
                    />
                    
                    <div className="mt-2 text-sm text-neutral-600">
                      Vous pouvez utiliser la syntaxe Markdown pour formater votre contenu.
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Aperçu du contenu
                    </label>
                    <div className="border border-neutral-300 rounded-lg p-6 bg-white min-h-96">
                      <h1 className="text-3xl font-bold text-neutral-900 mb-6">{content.title}</h1>
                      <div className="prose max-w-none">
                        {content.content.split('\n').map((paragraph, index) => {
                          if (paragraph.trim() === '') return <br key={index} />;
                          
                          // Traitement basique du Markdown
                          let processedText = paragraph
                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            .replace(/\*(.*?)\*/g, '<em>$1</em>')
                            .replace(/`(.*?)`/g, '<code class="bg-neutral-100 px-1 rounded">$1</code>');
                          
                          if (paragraph.startsWith('# ')) {
                            return <h1 key={index} className="text-2xl font-bold mt-6 mb-4" dangerouslySetInnerHTML={{ __html: processedText.substring(2) }} />;
                          } else if (paragraph.startsWith('## ')) {
                            return <h2 key={index} className="text-xl font-bold mt-5 mb-3" dangerouslySetInnerHTML={{ __html: processedText.substring(3) }} />;
                          } else if (paragraph.startsWith('- ')) {
                            return <li key={index} className="ml-4" dangerouslySetInnerHTML={{ __html: processedText.substring(2) }} />;
                          } else if (paragraph.startsWith('> ')) {
                            return <blockquote key={index} className="border-l-4 border-primary-500 pl-4 italic text-neutral-700" dangerouslySetInnerHTML={{ __html: processedText.substring(2) }} />;
                          } else {
                            return <p key={index} className="mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: processedText }} />;
                          }
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* SEO et Métadonnées */}
            <Card>
              <h3 className="text-lg font-bold text-neutral-900 mb-4">SEO et Métadonnées</h3>
              <div className="space-y-4">
                <Textarea
                  label="Description Meta"
                  value={content.metaDescription}
                  onChange={(e) => setContent(prev => ({ ...prev, metaDescription: e.target.value }))}
                  placeholder="Description pour les moteurs de recherche..."
                  rows={3}
                />
                
                <Input
                  label="Mots-clés Meta"
                  value={content.metaKeywords}
                  onChange={(e) => setContent(prev => ({ ...prev, metaKeywords: e.target.value }))}
                  placeholder="mot-clé1, mot-clé2, mot-clé3"
                />
                
                <Input
                  label="Image mise en avant (URL)"
                  value={content.featuredImage}
                  onChange={(e) => setContent(prev => ({ ...prev, featuredImage: e.target.value }))}
                  placeholder="https://exemple.com/image.jpg"
                />
              </div>
            </Card>
          </div>

          {/* Panneau latéral */}
          <div className="space-y-6">
            {/* Paramètres de publication */}
            <Card>
              <h3 className="text-lg font-bold text-neutral-900 mb-4">Publication</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Statut
                  </label>
                  <select
                    value={content.status}
                    onChange={(e) => setContent(prev => ({ ...prev, status: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="draft">Brouillon</option>
                    <option value="review">En révision</option>
                    <option value="published">Publié</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Section
                  </label>
                  <select
                    value={content.section}
                    onChange={(e) => setContent(prev => ({ ...prev, section: e.target.value }))}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    required
                  >
                    <option value="">Sélectionner une section</option>
                    {sections.map(section => (
                      <option key={section} value={section}>
                        {section}
                      </option>
                    ))}
                  </select>
                </div>
                
                <Input
                  label="Date de publication"
                  type="date"
                  value={content.publishDate}
                  onChange={(e) => setContent(prev => ({ ...prev, publishDate: e.target.value }))}
                />
                
                <Input
                  label="Auteur"
                  value={content.author}
                  onChange={(e) => setContent(prev => ({ ...prev, author: e.target.value }))}
                  placeholder="Nom de l'auteur"
                />
              </div>
            </Card>

            {/* Aide Markdown */}
            <Card>
              <h3 className="text-lg font-bold text-neutral-900 mb-4">Aide Markdown</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <code className="bg-neutral-100 px-2 py-1 rounded"># Titre 1</code>
                  <p className="text-neutral-600 mt-1">Titre principal</p>
                </div>
                <div>
                  <code className="bg-neutral-100 px-2 py-1 rounded">## Titre 2</code>
                  <p className="text-neutral-600 mt-1">Sous-titre</p>
                </div>
                <div>
                  <code className="bg-neutral-100 px-2 py-1 rounded">**gras**</code>
                  <p className="text-neutral-600 mt-1">Texte en gras</p>
                </div>
                <div>
                  <code className="bg-neutral-100 px-2 py-1 rounded">*italique*</code>
                  <p className="text-neutral-600 mt-1">Texte en italique</p>
                </div>
                <div>
                  <code className="bg-neutral-100 px-2 py-1 rounded">- Liste</code>
                  <p className="text-neutral-600 mt-1">Élément de liste</p>
                </div>
                <div>
                  <code className="bg-neutral-100 px-2 py-1 rounded">[lien](url)</code>
                  <p className="text-neutral-600 mt-1">Créer un lien</p>
                </div>
              </div>
            </Card>

            {/* Aperçu de l'image */}
            {content.featuredImage && (
              <Card>
                <h3 className="text-lg font-bold text-neutral-900 mb-4">Image mise en avant</h3>
                <img
                  src={content.featuredImage}
                  alt="Aperçu"
                  className="w-full h-32 object-cover rounded-lg"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentEditor;