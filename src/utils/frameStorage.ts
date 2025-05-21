
/**
 * Utility functions for handling frame storage and retrieval
 */

// Key prefix for storing frames in localStorage
const FRAME_PREFIX = 'lonframe-';

/**
 * Store a frame in localStorage with proper prefix
 * @param frameId The ID of the frame (without prefix)
 * @param dataUrl The data URL of the frame image
 */
export const storeFrame = (frameId: string, dataUrl: string): string => {
  // Remove any existing prefix to avoid double-prefixing
  const cleanId = frameId.startsWith('custom-') ? frameId : `custom-${frameId}`;
  const storageKey = cleanId;
  
  try {
    localStorage.setItem(storageKey, dataUrl);
    console.log(`Frame stored with key: ${storageKey}`);
    return cleanId;
  } catch (error) {
    console.error('Error storing frame:', error);
    throw new Error('Failed to store frame');
  }
};

/**
 * Retrieve a frame from localStorage
 * @param frameId The ID of the frame (with or without prefix)
 * @returns The data URL of the frame image or null if not found
 */
export const getFrame = (frameId: string): string | null => {
  // Ensure we have the proper format for the storage key
  const storageKey = frameId;
  
  try {
    const frame = localStorage.getItem(storageKey);
    return frame;
  } catch (error) {
    console.error('Error retrieving frame:', error);
    return null;
  }
};

/**
 * Delete a frame from localStorage
 * @param frameId The ID of the frame (with or without prefix)
 */
export const deleteFrame = (frameId: string): void => {
  // Ensure we have the proper format for the storage key
  const storageKey = frameId.startsWith('custom-') ? frameId : `custom-${frameId}`;
  
  try {
    localStorage.removeItem(storageKey);
    console.log(`Frame deleted: ${storageKey}`);
  } catch (error) {
    console.error('Error deleting frame:', error);
  }
};

/**
 * Get all stored frames
 * @returns Array of frame IDs
 */
export const getAllFrameIds = (): string[] => {
  try {
    const frameIds: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('custom-')) {
        frameIds.push(key);
      }
    }
    return frameIds;
  } catch (error) {
    console.error('Error retrieving all frames:', error);
    return [];
  }
};
